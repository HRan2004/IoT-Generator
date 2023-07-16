package com.hraps.iotgenerator.generate.test

import com.alibaba.fastjson2.JSONObject
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.hraps.iotgenerator.generate.DoGenerate
import com.hraps.iotgenerator.generate.TaskData
import com.hraps.iotgenerator.utils.FileUtils
import java.io.File

const val TASK_FILE = "${DoGenerate.TEST_PATH}\\tasks\\project3.json"
const val OUTPUT_FILE = "${DoGenerate.TEST_PATH}\\result\\app.zip"
const val DATA_PATH = "${DoGenerate.TEST_PATH}\\data.json"

const val USE_DATA_GENERATE = true
const val USE_CODE_GENERATE = true
const val USE_COMPILE = false
const val USE_ZIP = false

fun main() {
    if (USE_DATA_GENERATE) {
        val jsonText = FileUtils.read(TASK_FILE)
        val data = TaskData(JSONObject.parseObject(jsonText))
        val gson = GsonBuilder().setPrettyPrinting().create()
        FileUtils.write(DATA_PATH, gson.toJson(data))
        println("Data generate: Success")
    }
    if (USE_CODE_GENERATE) {
        val data = Gson().fromJson(FileUtils.read(DATA_PATH), TaskData::class.java)
        val result = DoGenerate.generate(data)
        println("Code generate: $result")
    }
    if (USE_COMPILE) {
        val result = DoGenerate.compile()
        println("Compile result: $result")
    }
    if (USE_ZIP) {
        val result = DoGenerate.zip()
        println("Zip result: $result")
    }
}
