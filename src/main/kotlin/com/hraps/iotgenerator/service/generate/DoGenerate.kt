package com.hraps.iotgenerator.service.generate

import com.google.gson.Gson
import com.google.gson.GsonBuilder

object DoGenerate {

    fun generate (task: TaskData): String {
        val gson = GsonBuilder().setPrettyPrinting().create()
        val str = gson.toJson(task)
        println(str)
        return ""
    }

}