package com.hraps.iotgenerator.controller

import com.alibaba.fastjson2.JSONObject
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.hraps.iotgenerator.generate.TaskData
import com.hraps.iotgenerator.service.GenerateService
import com.hraps.iotgenerator.utils.FileUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.FileSystemResource
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.io.File

@CrossOrigin
@RestController
class TaskController {

    @Autowired
    lateinit var generateService: GenerateService

    var projects = emptyArray<String>()

    @RequestMapping("/api/generate", method = [RequestMethod.POST])
    fun task(
        @RequestBody jsonText: String,
    ): Map<String, Any> {
        println("\nStart task: ")
        return try {
            val data = JSONObject.parseObject(jsonText)
            val project = generateService.generate(data)
            projects += project
            mapOf<String, Any>(
                "code" to 200,
                "result" to "Success",
                "project" to project
            )
        } catch (e: Exception) {
            e.printStackTrace()
            mapOf<String, Any>(
                "code" to 500,
                "result" to "Failed",
                "project" to ""
            )
        }
    }

    @GetMapping("/api/download/{id}.zip", produces = [MediaType.APPLICATION_OCTET_STREAM_VALUE])
    fun getFile(@PathVariable id: String): ResponseEntity<FileSystemResource> {
        val file = File("$id.zip")
        if (!file.exists()) {
            return ResponseEntity.notFound().build()
        }
        val resource = FileSystemResource(file)
        return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=\"${resource.filename}\"")
            .body(resource)
    }

    @RequestMapping("/ping", method = [RequestMethod.GET])
    fun ping(): Map<String, Any> {
        return mapOf("result" to "Success")
    }

}