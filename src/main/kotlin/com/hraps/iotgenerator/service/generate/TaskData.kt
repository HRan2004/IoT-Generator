package com.hraps.iotgenerator.service.generate

import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.service.generate.classes.*
import com.hraps.iotgenerator.service.generate.mapper.DapmItem
import com.hraps.iotgenerator.service.generate.mapper.DeviceAndPortMap

class TaskData(json: JSONObject) {
    var name: String = ""

    var devices: Array<Device> = emptyArray()
    var edges: Array<Edge> = emptyArray()
    var logics: Array<Logic> = emptyArray()

    private var counter: HashMap<String, Int> = hashMapOf()

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
                edges += edge
            } else if (cell.containsKey("shape")) {
                val shape = cell.getString("shape")
                val ports = cell.getJSONObject("ports").getJSONArray("items")
                val data = cell.getJSONObject("data")
                var disable = false
                try {
                    disable = data.getBoolean("disable")
                } catch (_: Exception) {}
                lateinit var node: Node
                var talItem: DapmItem? = null
                if (shape == "device-node") {
                    node = Device()
                    node.name = data.getString("device")
                    if (counter.containsKey(node.name)) {
                        counter[node.name] = counter[node.name]!! + 1
                    } else {
                        counter[node.name] = 0
                    }
                    node.index = counter[node.name]!!
                    node.vn = node.name
                        .replace("(", "")
                        .replace(")", "")
                        .replace(" ", "")
                        .replace("-", "")
                    node.vn = node.vn[0].lowercaseChar() + node.vn.substring(1) + node.index
                    talItem = DeviceAndPortMap.getItem(node.name)
                    if (talItem != null) {
                        node.tal = talItem.tal
                    }
                    devices += node
                } else if (shape == "logic-node") {
                    node = Logic()
                    logics += node
                } else {
                    return@map
                }
                node.id = id
                node.disable = disable
                ports.map { pit ->
                    val port = pit as JSONObject
                    val pid = port.getString("id")
                    val name = port.getString("text")
                    if (name == null || name == "+" || name == "") return@map
                    val left = port.getString("group") == "left"
                    var pd = false
                    try {
                        pd = port.getJSONObject("attrs").getJSONObject("data").getBoolean("disable")
                    } catch (_: Exception) {}
                    var tal = ""
                    if (talItem != null) {
                        tal = talItem.ports[name] ?: ""
                    }
                    node.ports += Port(pid, name, left, pd, tal)
                }
            }
        }
    }
}
