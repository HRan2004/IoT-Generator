package com.hraps.iotgenerator.generate.logic

import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.generate.classes.Event
import com.hraps.iotgenerator.generate.classes.Logic


object LogicGenerate {

    fun makeEvent(event: Event, logic: Logic, indent: Int = 0): String {
        val args = event.trigger.split(" ")
        val code = makeEquipCode(event.code.trim())

        val trigger = args[0]
        var result = ""
        if (trigger == "START") {
            result = "setTimeout(async () => {\n${addIndent(code)}\n}, 0)\n"
        } else {
            val port = args[1]
            val pd = logic.pdm[port]!!
        }

        if (indent != 0) result = addIndent(result, indent, false)
        return result
    }

    private fun makeEquipCode(code: String): String {
        val ar = JsAnalysis.analysis(code)
        println(ar.toJSONString())
        var result = code

        return result
    }

    private fun addIndent(code: String, indent: Int = 2, first: Boolean = true): String {
        val lines = code.split("\n")
        val space = " ".repeat(indent)
        var result = lines.joinToString("\n") { space + it }
        if (!first) {
            result = result.substring(indent)
        }
        return result
    }

}