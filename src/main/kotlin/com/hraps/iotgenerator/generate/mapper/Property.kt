package com.hraps.iotgenerator.generate.mapper

class Property (
    val device: String = "",
    val name: String = "",
    val tal: String = "",
    val type: TalType = TalType(),

    val permission: String = "rwn",

    val getFunctionName : String = "get" + tal.capitalize(),
    val setFunctionName : String = "set" + tal.capitalize(),
) {
    fun canRead(): Boolean {
        return permission.contains("r")
    }

    fun canWrite(): Boolean {
        return permission.contains("w")
    }

    fun canNotify(): Boolean {
        return permission.contains("n")
    }

    fun isAction(): Boolean {
        return permission.contains("a")
    }
}
