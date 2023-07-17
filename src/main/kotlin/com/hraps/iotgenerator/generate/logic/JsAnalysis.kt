package com.hraps.iotgenerator.generate.logic

import com.alibaba.fastjson2.JSONArray
import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.generate.DoGenerate
import java.io.File
import java.io.FileReader
import javax.script.Invocable
import javax.script.ScriptEngineManager

object JsAnalysis {

    fun analysis(code: String): JSONObject {
        val engine = ScriptEngineManager().getEngineByName("JavaScript")
        val ANALYSIS_PATH = "${DoGenerate.BASE_PATH}${File.separator}analysis${File.separator}"
        engine.eval(FileReader("${ANALYSIS_PATH}analysis.js"))
        val invocable = engine as Invocable
        return JSONObject.parseObject(invocable.invokeFunction("parseJs", "${ANALYSIS_PATH}esprima.js", code).toString())
    }

    fun recursionGetCalls(obj: JSONObject, calls: MutableList<JSONObject> = mutableListOf(), level: Int = 0): MutableList<JSONObject> {
        var cs = calls.toMutableList()
        if (obj.containsKey("type")) {
//            println("    ".repeat(level) + obj.getString("type"))
            if (obj.getString("type") == "CallExpression") {
                cs += obj
            }
        }
        if (obj.containsKey("body") && obj["body"] is JSONArray) {
            val body = obj.getJSONArray("body")
            for (i in 0 until body.size) {
                val item = body.getJSONObject(i)
                cs = recursionGetCalls(item, cs, level + 1)
            }
        }
        if (obj.containsKey("arguments") && obj["arguments"] is JSONArray) {
            val args = obj.getJSONArray("arguments")
            for (i in 0 until args.size) {
                val item = args.getJSONObject(i)
                cs = recursionGetCalls(item, cs, level + 1)
            }
        }
        for (key in obj.keys) {
            val value = obj[key]
            if (value is JSONObject) {
                cs = recursionGetCalls(value, cs, level + 1)
            }
        }
        return cs
    }

}

fun test() {
    val result = JsAnalysis.analysis(
        "for(let i=0;i<3;i++){\n" +
        "  PDxO('CONTROL', 'B1', 0)\n" +
        "  sleep(1 * 1000)\n" +
        "}\n"
    )
    println(result.toJSONString())
    val calls = JsAnalysis.recursionGetCalls(result)
    for (call in calls) {
        println("Call:")
        println(call.toJSONString())
    }
}
