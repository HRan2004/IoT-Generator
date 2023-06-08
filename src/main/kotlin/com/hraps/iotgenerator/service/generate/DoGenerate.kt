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

    fun generate(task: TaskData): String {
        copyTemplate()
        val dataTs = FileUtils.read("$TEMPLATE_PATH\\data.ts")
        val dataStr = if (DEBUG_MODE) gsonPretty.toJson(task) else gson.toJson(task)
        FileUtils.write("$WORK_PATH\\data.ts", dataTs.replace("null", dataStr))
        println(gsonPretty.toJson(task))
        return ""
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