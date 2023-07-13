package com.hraps.iotgenerator.generate.test

import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.generate.DoGenerate
import com.hraps.iotgenerator.generate.TaskData
import com.hraps.iotgenerator.utils.FileUtils

const val TASK_FILE = "${DoGenerate.TEST_PATH}\\tasks\\project1.json"
const val OUTPUT_FILE = "${DoGenerate.TEST_PATH}\\result\\app.zip"

const val USE_CODE_GENERATE = true
const val USE_COMPILE = false
const val USE_ZIP = false

fun main() {
    if (USE_CODE_GENERATE) {
        val jsonText = FileUtils.read(TASK_FILE)
        val json = JSONObject.parseObject(jsonText)
        val data = TaskData(json)
        val result = DoGenerate.generate(data)
        println("Generate result: $result")
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
