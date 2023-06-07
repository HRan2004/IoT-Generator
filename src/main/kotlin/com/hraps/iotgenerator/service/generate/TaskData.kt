package com.hraps.iotgenerator.service.generate

import com.alibaba.fastjson2.JSONArray
import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.service.generate.classes.Device
import com.hraps.iotgenerator.service.generate.classes.Edge
import com.hraps.iotgenerator.service.generate.classes.Logic

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
                val source = cell["source"] as JSONObject
                val target = cell["target"] as JSONObject
                val sourceCell = source["cell"] as String
                val targetCell = target["cell"] as String
                val sourcePort = source["port"] as String
                val targetPort = target["port"] as String
                val edge = Edge(id, sourceCell, targetCell, sourcePort, targetPort)
                edges.plus(edge)
            } else if (cell.containsKey("shape")) {
                val shape = cell["shape"] as String
                val ports = cell["item"] as JSONArray
                if (shape == "device-node") {
                    val device = Device(id)
                    devices.plus(device)
                } else if (shape == "logic-node") {
                    val logic = Logic(id)
                    logics.plus(logic)
                }
            }
        }
    }
}
