package com.hraps.iotgenerator.service

import com.alibaba.fastjson2.JSONObject
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.hraps.iotgenerator.generate.DoGenerate
import com.hraps.iotgenerator.generate.TaskData
import com.hraps.iotgenerator.utils.FileUtils
import org.springframework.stereotype.Service


@Service
class GenerateService {

    fun generate(json: JSONObject): String {
        var result = DoGenerate.generate(TaskData(json))
        println("Code generate: $result")
        result = DoGenerate.compile()
        println("Compile result: $result")
        result = DoGenerate.zip()
        println("Zip result: $result")
        return "Success"
    }

}
