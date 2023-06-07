package com.hraps.iotgenerator.service.generate.classes

import com.alibaba.fastjson2.JSONObject

class Logic (
    override val id: String = "",
    override val ports: Array<Port> = emptyArray(),
    override val disable: Boolean = false,
    val data: JSONObject = JSONObject(),
): Node(id, ports, disable) {
}
