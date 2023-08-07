package com.hraps.iotgenerator.generate

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.hraps.iotgenerator.Options
import com.hraps.iotgenerator.generate.logic.LogicGenerate
import com.hraps.iotgenerator.utils.FileUtils
import com.hraps.iotgenerator.utils.CommandUtils
import com.hraps.iotgenerator.utils.ZipUtils
import java.io.File
import java.util.Date

object DoGenerate {

    var DEBUG_MODE = true
//    var BASE_PATH = "C:\\Projects\\IoT-Storage"
    var BASE_PATH = "/root/iot/IoT-Storage"

    val STORAGE_PATH
        get() = "$BASE_PATH${File.separator}storage"
    private val COMPILE_PATH
        get() = "$BASE_PATH${File.separator}typescript"
    private val TEMPLATE_PATH
        get() = "$COMPILE_PATH${File.separator}template"
    private val WORK_PATH
        get() = "$COMPILE_PATH${File.separator}app"


    private val gsonPretty = GsonBuilder().setPrettyPrinting().create()
    private val gson = Gson()
    private lateinit var task: TaskData

    fun generate(task: TaskData): String {
        DoGenerate.task = task
        println("Copy template...")
        copyTemplate()
        println("Make files...")
        doMake(::makeDataFile, "$WORK_PATH${File.separator}data.ts")
        doMake(::makeIndexFile, "$WORK_PATH${File.separator}index.ts")
        doMake(::makeHtmlFile, "$WORK_PATH${File.separator}public${File.separator}index.html")
        // println(gsonPretty.toJson(task))
        return "Success"
    }

    fun compile(): String {
        CommandUtils.runCommand(listOf("npx", "webpack"), File(COMPILE_PATH))
        return "Success"
    }

    fun zip(): String {
        // if (DEBUG_MODE) {
        //     FileUtils.copyFolder("$COMPILE_PATH${File.separator}app", "$COMPILE_PATH${File.separator}dist${File.separator}app")
        // }
        ZipUtils.zip("$COMPILE_PATH${File.separator}dist", "$BASE_PATH${File.separator}python${File.separator}IoT-Ci${File.separator}upload${File.separator}app.zip")
        val id = "P" + Date().time.toString().substring(2)
        if (DEBUG_MODE) {
            val folder = File(STORAGE_PATH)
            if (!folder.exists()) folder.mkdirs()
            val fp = File.separator
            FileUtils.copyFile("$BASE_PATH${fp}python${fp}IoT-Ci${fp}upload${fp}app.zip", "$STORAGE_PATH${fp}$id.zip")
            FileUtils.copyFile("$BASE_PATH${fp}typescript${fp}dist${fp}index.js", "$STORAGE_PATH${fp}$id.js")
            FileUtils.copyFile("$BASE_PATH${fp}typescript${fp}app${fp}index.ts", "$STORAGE_PATH${fp}$id.ts")
        }
        return id
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
        var dsmLogicInit = emptyArray<String>()
        var initSetFunction = emptyArray<String>()
        var initProperties = emptyArray<String>()
        var initRemoteReceive = emptyArray<String>()
        var logicCodes = emptyArray<String>()
//        var l2lCodes = emptyArray<String>()

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
                    val input = if(property.isAction()) "" else "NormalParser.to(v)"
                    initSetFunction += "DSM.${device.vn}.${port.property}.update = v => ${device.vn}.${property.setFunctionName}(${input})"
                }
                if (property.canRead()) {
                    initProperties += "await DSM.${device.vn}.${port.property}.initCurrentValue(${device.vn}.${property.getFunctionName}())"
                }
                if (property.canNotify()) {
                    initRemoteReceive += "${device.vn}.subscribe(data => {\n" +
                        "    data.${port.property} = NormalParser.from(data.${port.property})\n" +
                        "    DSM.${device.vn}.${port.property}.setRemoteValue(data.${port.property})\n" +
                        "  })"
                }
            }
            if (dsmProperties.isNotEmpty()) {
                dsmInit += "DSM.${device.vn} = {\n    ${dsmProperties.joinToString("\n    ")}\n  }"
            }
        }
        for (logic in task.logics) {
            for (event in logic.events) {
                try {
                    logicCodes += LogicGenerate.makeEvent(event, logic, 2)
                } catch (e: Exception) {
                    println("Logic Code '${event.trigger}' Generate Error: ${e.message}")
                    e.printStackTrace()
                }
            }
            var dsmProperties = emptyArray<String>()
            for (state in logic.states) {
                dsmProperties += "${state}: new LogicProperty('${logic.vn}', '${state}'),"
            }
            if (dsmProperties.isNotEmpty()) {
                dsmLogicInit += "DSM.${logic.vn} = {\n    ${dsmProperties.joinToString("\n    ")}\n  }"
            }
        }
        text = text.replace("/* GENERATE DEVICE VAR CREATE */", deviceVarCreate.joinToString("\n"))
        text = text.replace("/* GENERATE DEVICE INIT */", deviceInit.joinToString("\n"))
        text = text.replace("/* GENERATE DSM INIT */", dsmInit.joinToString("\n  "))
        text = text.replace("/* GENERATE DSM LOGIC INIT */", dsmLogicInit.joinToString("\n  "))
        text = text.replace("/* GENERATE INIT SET FUNCTION */", initSetFunction.joinToString("\n  "))
        text = text.replace("/* GENERATE INIT PROPERTIES */", initProperties.joinToString("\n  "))
        text = text.replace("/* GENERATE INIT REMOTE RECEIVE */", initRemoteReceive.joinToString("\n  "))
        text = text.replace("/* GENERATE LOGIC CODE */", logicCodes.joinToString("\n  ").trim())
//        text = text.replace("/* GENERATE L2L BIND CODE */", l2lCodes.joinToString("\n  ").trim())

        var edgesPropertyBind = emptyArray<String>()
        var bindParserCounter = 0
        for (edge in task.edges) {
            val sourceDevice = task.devices.find { it.vn == edge.source.device } ?: continue
            val sourceProperty = task.properties.find { it.tal == edge.source.property && it.device == sourceDevice.tal } ?: continue
            val targetDevice = task.devices.find { it.vn == edge.target.device } ?: continue
            val targetProperty = task.properties.find { it.tal == edge.target.property && it.device == targetDevice.tal } ?: continue

            val pid = bindParserCounter++
            edgesPropertyBind += "let parser$pid = new DpParser('${sourceProperty.type.toCtText()}', '${targetProperty.type.toCtText()}')\n" +
                "  DSM.${sourceDevice.vn}.${sourceProperty.tal}.addListener(value => {\n" +
                "    value = parser$pid.convert(value)\n" +
                "    mlog(' ├ @BIND ${targetDevice.vn}.${targetProperty.tal} changed-to', value)\n" +
                "    DSM.${targetDevice.vn}.${targetProperty.tal}.setLocalValue(value, From.Local)\n" +
                "  })\n"
        }
        text = text.replace("/* GENERATE EDGES PROPERTY BIND */", edgesPropertyBind.joinToString("\n  ").trim())
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
        FileUtils.copyFile("$TEMPLATE_PATH${File.separator}index.ts.txt", "$WORK_PATH${File.separator}index.ts")
        FileUtils.copyFile("$TEMPLATE_PATH${File.separator}data.ts.txt", "$WORK_PATH${File.separator}data.ts")
        FileUtils.copyFile("$TEMPLATE_PATH${File.separator}index.html.txt", "$WORK_PATH${File.separator}public${File.separator}index.html")
    }

}