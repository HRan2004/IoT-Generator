package com.hraps.iotgenerator.generate

import com.hraps.iotgenerator.generate.classes.Event
import com.hraps.iotgenerator.generate.classes.Logic

object LogicGenerate {

    fun makeEvent(event: Event, logic: Logic, indent: Int = 0): String {
        val triggerArgs = event.trigger.split(" ")
        val code = event.code

        val trigger = triggerArgs[0]
        var result = ""
        if (trigger == "START") {
            println(addIndent(code.trim()))
            result = "setTimeout(async () => {\n${addIndent(code.trim())}\n}, 0)\n"
        }

        if (indent != 0) result = addIndent(result, indent, false)
        return result
    }

    fun addIndent(code: String, indent: Int = 2, first: Boolean = true): String {
        val lines = code.split("\n")
        val space = " ".repeat(indent)
        var result = lines.joinToString("\n") { space + it }
        if (!first) {
            result = result.substring(indent)
        }
        return result
    }

}