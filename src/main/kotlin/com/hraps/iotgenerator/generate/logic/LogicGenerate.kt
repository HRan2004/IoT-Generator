package com.hraps.iotgenerator.generate.logic

import com.alibaba.fastjson2.JSONArray
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

    // Only use in single makeEquipCode
    var code: String = ""
    var args: JSONArray = JSONArray()

    private fun makeEquipCode(code: String): String {
        this.code = code
        val ar = JsAnalysis.analysis(code)
        val calls = JsAnalysis.recursionGetCalls(ar)
        val replaceMap = mutableListOf<MutableList<String>>()
        for (call in calls) {
            val name = call.getJSONObject("callee").getString("name")
            this.args = call.getJSONArray("arguments")
            val sc = code.substring(
                call.getJSONArray("range").getInteger(0),
                call.getJSONArray("range").getInteger(1)
            )
            var tc = ""
            if (name == "PDO" || name == "PDS") {
                val ats = getArgTexts()
                val type = ats[0].substring(1, ats[0].length - 1)
                if (type == "CONTROL") {
                    tc = "await ${ats[1]}(${ats[2]}, ${ats[3]})\n"
                } else {
                    continue
                }
            } else if (name == "sleep") {
                tc = "await Queue.delay(${getArgText(0)})\n"
            }
            replaceMap.add(mutableListOf(sc, tc))
        }
        return ""
    }

    private fun getArgTexts(): MutableList<String> {
        val texts = mutableListOf<String>()
        for (i in 0 until args.size) {
            texts.add(getArgText(i))
        }
        return texts
    }

    private fun getArgText(i: Int): String {
        if (args.size <= i) return ""
        val range = args.getJSONObject(i).getJSONArray("range")
        return code.substring(range.getInteger(0), range.getInteger(1))
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