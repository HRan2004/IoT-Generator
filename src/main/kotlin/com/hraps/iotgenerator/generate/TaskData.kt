package com.hraps.iotgenerator.generate

import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.generate.classes.*
import com.hraps.iotgenerator.generate.classes.*
import com.hraps.iotgenerator.generate.mapper.DapmItem
import com.hraps.iotgenerator.generate.mapper.DeviceAndPortMap
import com.hraps.iotgenerator.generate.mapper.Property

class TaskData(json: JSONObject) {
    var name: String = ""

    var devices: Array<Device> = emptyArray()
    var edges: Array<Edge> = emptyArray()
    var logics: Array<Logic> = emptyArray()
    var properties: Array<Property> = emptyArray()

    // private var counter: HashMap<String, Int> = hashMapOf()
    private var counter = 0

    init {
        name = json["name"] as String
        val cells = json.getJSONArray("cells")
        cells.map {
            val cell = it as JSONObject
            if (!cell.containsKey("id")) return@map
            val id = cell.getString("id")
            if (cell.containsKey("shape")) {
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
                    // if (counter.containsKey(node.name)) {
                    //     counter[node.name] = counter[node.name]!! + 1
                    // } else {
                    //     counter[node.name] = 0
                    // }
                    // node.index = counter[node.name]!!
                    node.index = counter++
                    talItem = DeviceAndPortMap.getItem(node.name)
                    if (talItem != null) {
                        node.tal = talItem.tal
                        node.vn = node.tal
                            .replace("(", "")
                            .replace(")", "")
                            .replace("_1", "")
                        node.vn = node.vn[0].lowercaseChar() + node.vn.substring(1) + node.index
                        devices += node
                    }
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
                    if (talItem != null) {
                        val property = talItem.getProperty(name) ?: return@map
                        this.addProperty(property)
                        node.ports += Port(pid, name, left, pd, property.tal)
                    }
                }
            }
        }
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
                val disable = false
                val sourceDevice = devices.find { it.id == sourceCell } ?: return@map
                val targetDevice = devices.find { it.id == targetCell } ?: return@map
                val sourcePortObj = sourceDevice.ports.find { it.id == sourcePort } ?: return@map
                val targetPortObj = targetDevice.ports.find { it.id == targetPort } ?: return@map
                edges += Edge(
                    id,
                    EdgePoint(sourceCell, targetCell, sourceDevice.vn, sourcePortObj.property),
                    EdgePoint(sourcePort, targetPort, targetDevice.vn, targetPortObj.property),
                    disable
                )
            }
        }
    }

    private fun addProperty(property: Property) {
        val hp = properties.find { it.tal == property.tal && it.device == property.device }
        if (hp == null) {
            properties += property
        }
    }
}