package com.hraps.iotgenerator.service.generate.classes

import com.alibaba.fastjson2.JSONObject

class Logic (
    override var id: String = "",
    override val ports: Array<Port> = emptyArray(),
    override var disable: Boolean = false,
    val data: JSONObject = JSONObject(),
): Node(id, ports, disable) {
}
