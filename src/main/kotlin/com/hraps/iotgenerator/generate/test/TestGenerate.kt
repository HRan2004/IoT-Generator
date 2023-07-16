package com.hraps.iotgenerator.generate.test

import com.alibaba.fastjson2.JSONObject
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.hraps.iotgenerator.generate.DoGenerate
import com.hraps.iotgenerator.generate.TaskData
import com.hraps.iotgenerator.utils.FileUtils
import java.io.File

object Options {
    const val TASK_FILE = "${DoGenerate.TEST_PATH}\\tasks\\project4.json"
    const val OUTPUT_FILE = "${DoGenerate.TEST_PATH}\\result\\app.zip"
    const val DATA_PATH = "${DoGenerate.TEST_PATH}\\data.json"

    const val USE_DATA_GENERATE = true
    const val USE_CODE_GENERATE = true
    const val USE_COMPILE = false
    const val USE_ZIP = false
}

fun main() {
    if (Options.USE_DATA_GENERATE) {
        val jsonText = FileUtils.read(Options.TASK_FILE)
        val data = TaskData(JSONObject.parseObject(jsonText))
        val gson = GsonBuilder().setPrettyPrinting().create()
        FileUtils.write(Options.DATA_PATH, gson.toJson(data))
        println("Data generate: Success")
    }
    if (Options.USE_CODE_GENERATE) {
        val data = Gson().fromJson(FileUtils.read(Options.DATA_PATH), TaskData::class.java)
        val result = DoGenerate.generate(data)
        println("Code generate: $result")
    }
    if (Options.USE_COMPILE) {
        val result = DoGenerate.compile()
        println("Compile result: $result")
    }
    if (Options.USE_ZIP) {
        val result = DoGenerate.zip()
        println("Zip result: $result")
    }
}
