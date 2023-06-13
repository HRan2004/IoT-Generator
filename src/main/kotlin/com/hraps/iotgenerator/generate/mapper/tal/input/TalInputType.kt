package com.jeejio.xiaomi.general.tal.input

enum class TalInputType (val value: kotlin.String) {
    INT("int"),
    FLOAT("float"),
    BOOLEAN("bool"),
    STRING("string"),
    OBJECT("object"),
    ANY("any");

    fun isNumber(): kotlin.Boolean {
        return this == INT || this == FLOAT
    }
}