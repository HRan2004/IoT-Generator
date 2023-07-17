package com.hraps.iotgenerator.controller

import com.alibaba.fastjson2.JSONObject
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.hraps.iotgenerator.generate.TaskData
import com.hraps.iotgenerator.service.GenerateService
import com.hraps.iotgenerator.utils.FileUtils
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
        println("\nStart task: ")
        return try {
            val data = JSONObject.parseObject(jsonText)
            val result = generateService.generate(data)
            "Success"
        } catch (e: Exception) {
            e.printStackTrace()
            "Failed"
        }
    }

    @RequestMapping("/ping", method = [RequestMethod.GET])
    fun ping(): String {
        return "Success"
    }

}