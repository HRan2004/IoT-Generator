package com.jeejio.xiaomi.general.tal

import com.alibaba.fastjson2.JSONObject
import com.jeejio.xiaomi.general.tal.input.TalInput

open class TalParser {
    var input: Any = 0

    open fun parseInput(input: JSONObject): JSONObject {
        return input
    }

    open fun parseOutput(output: JSONObject): JSONObject {
        return output
    }

    open fun setArg(input: TalInput?, output: TalInput?) {}

    open fun isDefault(): Boolean {
        return false
    }

    open fun setInputValue(value: Any) {
        input = value
    }
}