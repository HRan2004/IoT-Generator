package com.hraps.iotgenerator.generate.logic

import com.alibaba.fastjson2.JSONArray
import com.hraps.iotgenerator.generate.classes.Event
import com.hraps.iotgenerator.generate.classes.Logic


object LogicGenerate {

    // Only use in single makeEquipCode
    var code: String = ""
    var args: JSONArray = JSONArray()
    private var pdm = mutableMapOf<String, String>()
    private const val DEBUG_MODE = false
    private const val MORE_LOG = true // 开启后小应用将打印详细调用流程日志

    fun makeEvent(event: Event, logic: Logic, indent: Int = 0): String {
        val args = event.trigger.split(" ")
        var code = makeEquipsCode(event.code.trim(), logic)
        if (DEBUG_MODE) println("\nTrigger: " + event.trigger)
        if (DEBUG_MODE) println(event.code)

        val trigger = args[0]
        var result = ""
        this.pdm = logic.pdm

        if (trigger == "START") {
            if (MORE_LOG) code = "mlog(' ├ @EVENT $trigger')\n$code"
            result = "setTimeout(async () => {\n${addIndent(code)}\n}, 0)\n"
        } else {
            val pd = pdm[args[1]] ?: ""
            if (MORE_LOG) code = "mlog(' ├ @EVENT $trigger $pd changed-to', v)\n$code"
            if (pd.isEmpty()) {
                println("Port ${args[1]} in logic ${logic.id} can not matched")
                return "// Port ${args[1]} in logic ${logic.id} can not matched"
            }
            if (trigger == "CHANGE") {
                result = "DSM.$pd.addListener(async v => {\n${addIndent(code)}\n})\n"
            } else if (trigger == "EQUIP_STATE" || trigger == "EQUIP_EXIST_STATUS") {
                val con = if (args[2] == "0") "v" else "!v"
                result = "DSM.$pd.addListener(async v => {\n  " +
                    "if ($con) {\n${addIndent(code, 4)}\n  }" +
                    "\n})\n"
            } else if (trigger == "COMPARE") {
                val con = arrayOf<String>(">", "<", "==", ">=", "<=", "!=")[args[2].toInt()]
                val num = args[3].toDouble()
                result = "DSM.$pd.addListener(async v => {\n  " +
                    "if (v $con $num) {\n${addIndent(code, 4)}\n  }" +
                    "\n})\n"
            } else if (trigger == "COMPARE_TEXT") {
                val text = args[2]
                result = "DSM.$pd.addListener(async v => {\n  " +
                    "if (v == '$text') {\n${addIndent(code, 4)}\n  }" +
                    "\n})\n"
            }
        }

        if (indent != 0) result = addIndent(result, indent, false)
        if (DEBUG_MODE) println("Result:")
        if (DEBUG_MODE) println("  $result")
        return result
    }

    private fun makeEquipsCode(code: String, logic: Logic): String {
        this.code = code
        this.pdm = logic.pdm
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
                val result = makeEquip(name == "PDS")
                if (result.isEmpty()) {
                    println("Port ${getArgText(0)} in logic ${logic.id} for control can not matched")
                }
                tc = result
            } else if (name == "sleep") {
                tc = "await Queue.delay(${getArgText(0)})"
            }
            if (tc.isNotEmpty()) {
                replaceMap.add(mutableListOf(sc, tc))
            }
        }
        var result = code
        for (rm in replaceMap) {
            result = result.replaceFirst(rm[0], rm[1])
        }
        return result
    }

    private fun makeEquip(isOutput: Boolean): String {
        val dp = getDpByI(1)
        if (dp.isEmpty()) return ""
        val ats = getArgTexts()
        println(ats)
        val type = ats[0].substring(1, ats[0].length - 1)

        var get = "getLocalValue"
        var set = "setLocalValue"
        val isTargetLogic = dp.startsWith("logic")
        if (isTargetLogic) {
            get = "getValue"
            set = "setValue"
        }

        var logText = " ├ @EQUIP-${if (isOutput) "PDS" else "PDO"} $type $dp "
        var code = if (type == "CONTROL") {
            val v1l = arrayOf("true", "false")
            val v = v1l[ats[2].toInt()]
            logText += "set as boolean: ${v.replace("'", "\"")}"
            "DSM.$dp.$set($v)"
        } else if (type == "BOOLEAN" || type == "BOOLEAN_HAD") {
            "DSM.$dp.$get()"
        } else if (arrayOf("CONTROL_ROTATION", "ROTATION_VALUE", "ROTATION_TURNS_NUMBER").contains(type)) {
            "HaveNotSupport()"
        } else if (type == "VALUE") {
            val toType = arrayOf("number", "string", "time", "date", "boolean")[ats[2].toInt()]
            logText += "as $toType"
            "DSM.$dp.$get()"
        } else if (type == "COMPARE_TEXT") {
            val mode = ats[2].toInt()
            val text = "'${ats[3]}'"
            logText += "compare-$mode ${text.replace("'", "\"")}"
            if (mode == 0) { // Equal
                "DSM.$dp.$get() == $text"
            } else if (mode == 1) { // Include
                "DSM.$dp.$get().indexOf($text) >= 0"
            } else { // Include by
                "${text}.indexOf(DSM.$dp.$get()) >= 0"
            }
        } else if (type == "COMPARE") {
            val con = arrayOf(">", "<", "==", "!=")[ats[2].toInt()]
            val num = ats[3].toDouble()
            logText += "$con $num"
            "DSM.$dp.$get() $con $num"
        } else if (type == "SET_VALUE") {
            val toType = arrayOf("number", "string", "time", "date", "object")[ats[2].toInt()]
            logText += "set as $toType: ${ats[3].replace("'", "\"")}"
            "DSM.$dp.$set(${ats[3]})"
        } else {
            ""
        }
        if (MORE_LOG && code.isNotEmpty()) {
            if (isOutput) {
                code = "\n  mlog('$logText')\n${addIndent("|| $code")}\n"
            } else {
                code = "mlog('$logText')\n$code"
            }
        }
        return code
    }

    private fun getDpByI(i: Int): String {
        var port = getArgText(i)
        port = port.substring(1, port.length - 1)
        return pdm[port] ?: ""
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