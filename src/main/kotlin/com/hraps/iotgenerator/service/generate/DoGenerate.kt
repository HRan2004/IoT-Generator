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
        for (device in task.devices) {
            deviceVarCreate += "let ${device.vn}: ${device.tal}"
            deviceInit += "${device.vn} = deviceManager.get${device.tal}('${device.name}_${device.index}')"
        }
        text = text.replace("/* GENERATE DEVICE VAR CREATE */", deviceVarCreate.joinToString("\n"))
        text = text.replace("/* GENERATE DEVICE INIT */", deviceInit.joinToString("\n    "))
        val mainCode = ""
        text = text.replace("/* GENERATE MAIN CODE */\n", mainCode)
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