package com.hraps.iotgenerator.generate

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.hraps.iotgenerator.Options
import com.hraps.iotgenerator.utils.FileUtils
import com.hraps.iotgenerator.utils.CommandUtils
import com.hraps.iotgenerator.utils.ZipUtils
import java.io.File

object DoGenerate {

    const val DEBUG_MODE = true

    const val BASE_PATH = "C:\\Projects\\IoT-Generator\\src\\main"
//    const val BASE_PATH = "C:\\Users\\21257\\Documents\\GitHub\\IoT-Generator\\src\\main"
    const val TEST_PATH = "$BASE_PATH\\kotlin\\com\\hraps\\iotgenerator\\generate\\test"

    const val TEMPLATE_PATH = "$BASE_PATH\\typescript\\projects\\template"
    const val COMPILE_PATH = "$BASE_PATH\\typescript"
    const val WORK_PATH = "$BASE_PATH\\typescript\\app"

    private val gsonPretty = GsonBuilder().setPrettyPrinting().create()
    private val gson = Gson()
    private lateinit var task: TaskData

    fun generate(task: TaskData): String {
        DoGenerate.task = task
        println("Copy template...")
        copyTemplate()
        println("Make files...")
        doMake(::makeDataFile, "$WORK_PATH\\data.ts")
        doMake(::makeIndexFile, "$WORK_PATH\\index.ts")
        doMake(::makeHtmlFile, "$WORK_PATH\\public\\index.html")
        // println(gsonPretty.toJson(task))
        return "Success"
    }

    fun compile(): String {
        CommandUtils.runCommand(listOf("cmd.exe", "/c", "npx", "webpack"), File(COMPILE_PATH))
        return "Success"
    }

    fun zip(): String {
        ZipUtils.zip("$COMPILE_PATH\\dist", "$BASE_PATH\\python\\IoT-Ci\\upload\\app.zip")
        return "Success"
    }

    fun compileAndZipByPython() {
        if (Options.DEBUG_MODE) {
            println("Run fresh.py...")
            CommandUtils.runPython("src/main/python/IoT-Ci", "fresh.py")
        }
    }

    private fun doMake(make: (String) -> String, source: String, target: String = source) {
        val text = FileUtils.read(source)
        FileUtils.write(target, make(text))
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
        var logicCodes = emptyArray<String>()

        for (device in task.devices) {
            deviceVarCreate += "const ${device.vn}: ${device.tal}"
            deviceInit += "const ${device.vn} = DeviceManager.create${device.tal}('${device.name}_${device.index}')"
            var dsmProperties = emptyArray<String>()
            var hadArray = emptyArray<String>()
            for (port in device.ports) {
                if (hadArray.contains(port.property)) continue
                hadArray += port.property
                val property = task.properties.find { it.tal == port.property && it.device == device.tal } ?: continue
                dsmProperties += "${port.property}: new Property('${device.vn}', '${port.property}'),"
                if (property.canWrite()) {
                    initSetFunction += "DSM.${device.vn}.${port.property}.update = v => ${device.vn}.${property.setFunctionName}(NormalParser.to(v))"
                }
                if (property.canRead()) {
                    initProperties += "DSM.${device.vn}.${port.property}.setRemoteValue((await ${device.vn}.${property.getFunctionName}()).value)"
                }
                if (property.canNotify()) {
                    initRemoteReceive += "${device.vn}.subscribe(data => {\n" +
                        "    data.${port.property} = NormalParser.from(data.${port.property})\n" +
                        "    DSM.${device.vn}.${port.property}.setRemoteValue(data.${port.property})\n" +
                        "  })"
                }
            }
            dsmInit += "DSM.${device.vn} = {\n    ${dsmProperties.joinToString("\n    ")}\n  }"
        }
        for (logic in task.logics) {
            for (event in logic.events) {
                logicCodes += LogicGenerate.makeEvent(event, logic, 2)
            }
        }
        text = text.replace("/* GENERATE DEVICE VAR CREATE */", deviceVarCreate.joinToString("\n"))
        text = text.replace("/* GENERATE DEVICE INIT */", deviceInit.joinToString("\n"))
        text = text.replace("/* GENERATE DSM INIT */", dsmInit.joinToString("\n  "))
        text = text.replace("/* GENERATE INIT SET FUNCTION */", initSetFunction.joinToString("\n  "))
        text = text.replace("/* GENERATE INIT PROPERTIES */", initProperties.joinToString("\n  "))
        text = text.replace("/* GENERATE INIT REMOTE RECEIVE */", initRemoteReceive.joinToString("\n  "))
        text = text.replace("/* GENERATE LOGIC CODE */", logicCodes.joinToString("\n  "))

        var edgesPropertyBind = emptyArray<String>()
        for (edge in task.edges) {
            val sourceDevice = task.devices.find { it.vn == edge.source.device } ?: continue
            val sourceProperty = task.properties.find { it.tal == edge.source.property && it.device == sourceDevice.tal } ?: continue
            val targetDevice = task.devices.find { it.vn == edge.target.device } ?: continue
            val targetProperty = task.properties.find { it.tal == edge.target.property && it.device == targetDevice.tal } ?: continue
            edgesPropertyBind += "DSM.${sourceDevice.vn}.${sourceProperty.tal}.addListener(value => {\n" +
                "    value = new DpParser(DSM.${sourceDevice.vn}.${sourceProperty.tal}, DSM.${targetDevice.vn}.${targetProperty.tal}).parse(value)\n" +
                "    DSM.${targetDevice.vn}.${targetProperty.tal}.setLocalValue(value, From.Local)\n" +
                "  })"
        }
        text = text.replace("/* GENERATE EDGES PROPERTY BIND */", edgesPropertyBind.joinToString("\n  "))
        return text
    }

    private fun makeHtmlFile(source: String): String {
        var text = source
        text = text.replace("/* GENERATE PROJECT TITLE */", task.name)
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
        FileUtils.copyFile("$TEMPLATE_PATH\\index.html.txt", "$WORK_PATH\\public\\index.html")
    }

}