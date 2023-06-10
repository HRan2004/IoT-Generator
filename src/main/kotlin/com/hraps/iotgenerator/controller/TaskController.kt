package com.hraps.iotgenerator.controller

import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.service.GenerateService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMethod

@CrossOrigin
@RestController
class TaskController {

    @Autowired
    lateinit var generateService: GenerateService

    @RequestMapping("/api/generate", method = [RequestMethod.POST])
    fun task(
        @RequestBody jsonText: String,
    ): String {
        println(jsonText)
        val json = JSONObject.parseObject(jsonText)
        val result = generateService.generate(json)
        return "Success"
    }

    @RequestMapping("/ping", method = [RequestMethod.GET])
    fun ping(): String {
        return "Success"
    }

}