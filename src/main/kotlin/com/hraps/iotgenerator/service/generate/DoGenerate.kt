package com.hraps.iotgenerator.service.generate

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import java.io.File

object DoGenerate {
    private val BASE_PATH = "C:\\Projects\\IoT-Generator\\src\\main"
    private val TEMPLATE_PATH = "\\typescript\\projects\\template"
    private val WORK_PATH = "\\typescript\\app"

    private val gsonPretty = GsonBuilder().setPrettyPrinting().create()
    private val gson = Gson()

    fun generate(task: TaskData): String {
        copyTemplate()
        println(gsonPretty.toJson(task))
        return ""
    }

    private fun copyTemplate() {
        val templatePath = BASE_PATH + TEMPLATE_PATH
        val workPath = BASE_PATH + WORK_PATH
        val template = File(templatePath)
        val work = File(workPath)
        if (!template.exists()) {
            println("Template path not exists.")
            return
        }
        if (!work.exists()) {
            println("Work path not exists.")
            return
        }
        template.listFiles()?.map {
            val file = it
            val fileName = file.name
            val workFile = File(workPath + "\\" + fileName)
            if (workFile.exists()) {
                workFile.delete()
            }
            file.copyTo(workFile)
        }
    }

}