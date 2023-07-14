package com.hraps.iotgenerator.generate.classes

import com.alibaba.fastjson2.JSONObject

class Logic (
    override var id: String = "",
    override var ports: Array<Port> = emptyArray(),
    override var disable: Boolean = false,
    var events: Array<Event> = emptyArray(),
): Node {
}

class Event (
    val trigger: String,
    val code: String,
) {
}
