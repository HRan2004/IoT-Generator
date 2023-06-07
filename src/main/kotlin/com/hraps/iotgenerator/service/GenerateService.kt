package com.hraps.iotgenerator.service

import com.alibaba.fastjson2.JSONObject
import org.springframework.stereotype.Service


@Service
class GenerateService {

    fun generate(json: JSONObject): String {
        println("Start generate")
        return "Success"
    }

}