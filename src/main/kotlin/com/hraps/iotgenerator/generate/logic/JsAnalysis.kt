package com.hraps.iotgenerator.generate.logic

import com.alibaba.fastjson2.JSONObject
import java.io.File
import java.io.FileReader
import javax.script.Invocable
import javax.script.ScriptEngineManager

object JsAnalysis {

    fun analysis(code: String): JSONObject {
        val engine = ScriptEngineManager().getEngineByName("JavaScript")
        engine.eval(FileReader("src/main/kotlin/com/hraps/iotgenerator/generate/logic/analysis.js"))
        val invocable = engine as Invocable
        return JSONObject.parseObject(invocable.invokeFunction("parseJs", code).toString())
    }

}

fun main() {
    println(JsAnalysis.analysis("for(let i=0;i<3;i++){\n" +
        "  PDO('CONTROL', 'B1', 0)\n" +
        "  sleep(1 * 1000)\n" +
        "}"))
}
