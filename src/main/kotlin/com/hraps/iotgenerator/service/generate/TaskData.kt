package com.hraps.iotgenerator.service.generate

import com.alibaba.fastjson2.JSONArray
import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.service.generate.classes.*

class TaskData(json: JSONObject) {
    private var name: String = ""

    private val devices: Array<Device> = emptyArray()
    private val edges: Array<Edge> = emptyArray()
    private val logics: Array<Logic> = emptyArray()

    init {
        name = json["name"] as String
        val cells = json.getJSONArray("cells")
        cells.map {
            val cell = it as JSONObject
            if (!cell.containsKey("id")) return@map
            val id = cell.getString("id")
            if (cell.containsKey("source") && cell.containsKey("target")) {
                val source = cell.getJSONObject("source")
                val target = cell.getJSONObject("target")
                val sourceCell = source.getString("cell")
                val targetCell = target.getString("cell")
                val sourcePort = source.getString("port")
                val targetPort = target.getString("port")
                val edge = Edge(id, sourceCell, targetCell, sourcePort, targetPort)
                edges.plus(edge)
            } else if (cell.containsKey("shape")) {
                val shape = cell.getString("shape")
                val ports = cell.getJSONObject("ports").getJSONArray("items")
                val data = cell.getJSONObject("data")
                lateinit var node: Node
                if (shape == "device-node") {
                    node = Device()
                    devices.plus(node)
                } else if (shape == "logic-node") {
                    node = Logic()
                    logics.plus(node)
                } else {
                    return@map
                }
                node.id = id
                ports.map {
                    val port = it as JSONObject
                    val pid = port.getString("id")
                    val name = port.getString("text")
                    val left = port.getString("group") == "left"
                    var disable = false
                    try {
                        disable = port.getJSONObject("attrs").getJSONObject("data").getBoolean("disable")
                    } catch (_: Exception) {}
                    node.ports.plus(Port(pid, name, left, disable))
                }
            }
        }
    }
}
