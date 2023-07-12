package com.hraps.iotgenerator.generate.test

import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.generate.DoGenerate
import com.hraps.iotgenerator.generate.TaskData
import com.hraps.iotgenerator.generate.utils.CommandUtils
import com.hraps.iotgenerator.generate.utils.FileUtils
import java.io.File

const val TASK_FILE = "/tasks/project1.json"
const val OUTPUT_FILE = "/result/app.zip"

const val USE_COMPILE = true
const val USE_ZIP = true

fun main() {
    val jsonText = FileUtils.read(TASK_FILE)
    val json = JSONObject.parseObject(jsonText)
    val data = TaskData(json)
    val result = DoGenerate.generate(data)
    print(result)

    if (!USE_COMPILE) return
    CommandUtils.run(listOf("npx webpack"), File(DoGenerate.WORK_PATH))
    if (!USE_ZIP) return
}
