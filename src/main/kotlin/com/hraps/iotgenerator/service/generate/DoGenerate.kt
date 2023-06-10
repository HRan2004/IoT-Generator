package com.hraps.iotgenerator.service.generate

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.hraps.iotgenerator.service.generate.utils.FileUtils
import java.io.File

object DoGenerate {

    private const val DEBUG_MODE = true

    private const val BASE_PATH = "C:\\Projects\\IoT-Generator\\src\\main"
    private const val TEMPLATE_PATH = "$BASE_PATH\\typescript\\projects\\template"
    private const val WORK_PATH = "$BASE_PATH\\typescript\\app"

    private val gsonPretty = GsonBuilder().setPrettyPrinting().create()
    private val gson = Gson()
    private lateinit var task: TaskData

    fun generate(task: TaskData): String {
        this.task = task
        copyTemplate()
        FileUtils.write("$WORK_PATH\\data.ts", makeDataFile(FileUtils.read("$WORK_PATH\\data.ts")))
        FileUtils.write("$WORK_PATH\\index.ts", makeIndexFile(FileUtils.read("$WORK_PATH\\index.ts")))
        println(gsonPretty.toJson(task))
        return ""
    }

    private fun makeDataFile(source: String): String {
        val dataStr = if (DEBUG_MODE) gsonPretty.toJson(task) else gson.toJson(task)
        return source.replace("null", dataStr)
    }

    private fun makeIndexFile(source: String): String {
        var text = source
        var deviceVarCreate = emptyArray<String>()
        var deviceInit = emptyArray<String>()
        var dsmInit = emptyArray<String>()
        var initSetFunction = emptyArray<String>()
        var initProperties = emptyArray<String>()
        var initRemoteReceive = emptyArray<String>()

        for (device in task.devices) {
            deviceVarCreate += "let ${device.vn}: ${device.tal}"
            deviceInit += "${device.vn} = deviceManager.get${device.tal}('${device.name}_${device.index}')"
            var dsmProperties = emptyArray<String>()
            var hadArray = emptyArray<String>()
            for (port in device.ports) {
                if (hadArray.contains(port.property)) continue
                hadArray += port.property
                val property = task.properties.find { it.tal == port.property && it.device == device.tal } ?: continue
                dsmProperties += "${port.property}: new Property('${device.vn}', '${port.property}'),"
                if (property.canWrite()) {
                    initSetFunction += "DSM.${device.vn}.${port.property}.update = v => ${device.vn}.${property.setFunctionName}(Parser.parseToRemote(v))"
                }
                if (property.canRead()) {
                    initProperties += "DSM.${device.vn}.${port.property}.setRemoteValue((await ${device.vn}.${property.getFunctionName}()).value)"
                }
                if (property.canNotify()) {
                    initRemoteReceive += "${device.vn}.onReceive(data => {\n" +
                        "    data.${port.property} = Parser.parseFromRemote(data.${port.property})\n" +
                        "    DSM.${device.vn}.${port.property}.setRemoteValue(data.${port.property})\n" +
                        "  })"
                }
            }
            dsmInit += "DSM.${device.vn} = {\n      ${dsmProperties.joinToString("\n      ")}\n    }"
        }
        text = text.replace("/* GENERATE DEVICE VAR CREATE */", deviceVarCreate.joinToString("\n"))
        text = text.replace("/* GENERATE DEVICE INIT */", deviceInit.joinToString("\n    "))
        text = text.replace("/* GENERATE DSM INIT */", dsmInit.joinToString("\n    "))
        text = text.replace("/* GENERATE INIT SET FUNCTION */", initSetFunction.joinToString("\n  "))
        text = text.replace("/* GENERATE INIT PROPERTIES */", initProperties.joinToString("\n  "))
        text = text.replace("/* GENERATE INIT REMOTE RECEIVE */", initRemoteReceive.joinToString("\n  "))
        text = text.replace("/* GENERATE MAIN CODE */", "")
        return text
    }

    private fun copyTemplate() {
        if (!File(TEMPLATE_PATH).exists()) {
            println("Template path not exists.")
            return
        }
        if (!File(WORK_PATH).exists()) {
            println("Work path not exists.")
            return
        }
        FileUtils.copyFile("$TEMPLATE_PATH\\index.ts.txt", "$WORK_PATH\\index.ts")
        FileUtils.copyFile("$TEMPLATE_PATH\\data.ts.txt", "$WORK_PATH\\data.ts")
    }

}