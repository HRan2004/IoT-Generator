package com.hraps.iotgenerator

import com.alibaba.fastjson2.JSONObject
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.hraps.iotgenerator.generate.DoGenerate
import com.hraps.iotgenerator.generate.TaskData
import com.hraps.iotgenerator.utils.FileUtils
import org.junit.jupiter.api.Test
import java.io.File

class OnlyGenerateTests {

    val fp = File.separator

    private object Options {
        const val BASE_DEBUG_PATH = "src\\test\\generate"
        // 路径配置
        const val TASK_FILE = "${BASE_DEBUG_PATH}\\tasks\\project1.json"
        const val OUTPUT_FILE = "${BASE_DEBUG_PATH}\\result\\app.zip"
        const val DATA_PATH = "${BASE_DEBUG_PATH}\\data.json"

        // 分步调试控制
        const val USE_DATA_GENERATE = true
        const val USE_CODE_GENERATE = true
        const val USE_COMPILE = true
        const val USE_ZIP = true
    }

    init {
        DoGenerate.DEBUG_MODE = true
        DoGenerate.BASE_PATH = "C:\\Projects\\IoT-Storage"
    }

    private val JUMP_TEST = true

    @Test
    fun testAll() {
        if (JUMP_TEST) return
        if (Options.USE_DATA_GENERATE) testDataGenerate()
        if (Options.USE_CODE_GENERATE) testCodeGenerate()
        if (Options.USE_COMPILE) testCompile()
        if (Options.USE_ZIP) testZip()
    }

    @Test
    fun testDataGenerate() {
//        if (JUMP_TEST) return
        println(File(Options.TASK_FILE).absoluteFile)
        val jsonText = FileUtils.read(Options.TASK_FILE)
        val data = TaskData(JSONObject.parseObject(jsonText))
        val gson = GsonBuilder().setPrettyPrinting().create()
        FileUtils.write(Options.DATA_PATH, gson.toJson(data))
        println("Data generate: Success")
    }

    @Test
    fun testCodeGenerate() {
        if (JUMP_TEST) return
        val data = Gson().fromJson(FileUtils.read(Options.DATA_PATH), TaskData::class.java)
        val result = DoGenerate.generate(data)
        println("Code generate: $result")
    }

    @Test
    fun testCompile() {
        if (JUMP_TEST) return
        val result = DoGenerate.compile()
        println("Compile result: $result")
    }

    @Test
    fun testZip() {
        if (JUMP_TEST) return
        val result = DoGenerate.zip()
        println("Zip result: $result")
    }

}
