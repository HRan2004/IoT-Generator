package com.hraps.iotgenerator.service

import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.service.generate.DoGenerate
import com.hraps.iotgenerator.service.generate.TaskData
import org.springframework.stereotype.Service


@Service
class GenerateService {

    fun generate(json: JSONObject): String {
        println("Start generate")
        return "Success"
    }

}
