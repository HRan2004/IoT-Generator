package com.hraps.iotgenerator.generate.classes

import com.alibaba.fastjson2.JSONObject

class Logic (
    override var id: String = "",
    override var ports: Array<Port> = emptyArray(),
    override var disable: Boolean = false,
    override var vn: String = "",
    override var index: Int = 0,
    var events: Array<Event> = emptyArray(),
    var pdm: MutableMap<String, String> = mutableMapOf(), // Port text To Device and property Map
    var states: Array<String> = emptyArray(),
): Node {
}

class Event (
    val trigger: String,
    val code: String,
) {
}
