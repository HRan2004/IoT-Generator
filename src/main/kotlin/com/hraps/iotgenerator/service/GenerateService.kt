package com.hraps.iotgenerator.service

import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.generate.DoGenerate
import com.hraps.iotgenerator.generate.TaskData
import org.springframework.stereotype.Service


@Service
class GenerateService {

    fun generate(json: JSONObject): String {
        DoGenerate.generate(TaskData(json))
        return "Success"
    }

}
