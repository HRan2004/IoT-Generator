package com.hraps.iotgenerator.service.generate.mapper

import com.jeejio.xiaomi.general.tal.input.TalInputType

class Property (
    val name: String = "",
    val tal: String = "",

    val permission: String = "rwn",
    val talType: TalInputType = TalInputType.ANY,

    var range: FloatArray = floatArrayOf(),
    var options: Array<String> = arrayOf(),

    val getFunctionName : String = "get" + tal.capitalize(),
    val setFunctionName : String = "set" + tal.capitalize(),
) {
    fun canRead(): Boolean {
        return permission.contains("r")
    }

    fun canWrite(): Boolean {
        return permission.contains("w")
    }
}
