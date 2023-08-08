package com.hraps.iotgenerator.generate

import com.alibaba.fastjson2.JSONObject
import com.hraps.iotgenerator.generate.classes.*
import com.hraps.iotgenerator.generate.mapper.DapmItem
import com.hraps.iotgenerator.generate.mapper.DeviceAndPortMap
import com.hraps.iotgenerator.generate.mapper.Property

class TaskData(json: JSONObject) {
    var name: String = ""

    var devices: List<Device> = emptyList()
    var edges: List<Edge> = emptyList()
    var logics: List<Logic> = emptyList()
    var properties: List<Property> = emptyList()

    // private var counter: HashMap<String, Int> = hashMapOf()
    private var counter = 0
    private var logicCounter = 0

    init {
        name = json["name"] as String
        val cells = json.getJSONArray("cells")
        cells.map {
            val cell = it as JSONObject
            if (!cell.containsKey("id")) return@map
            val id = cell.getString("id")
            if (cell.containsKey("shape") && cell.containsKey("ports")) {
                val shape = cell.getString("shape")
                val ports = cell.getJSONObject("ports").getJSONArray("items")
                val data = cell.getJSONObject("data")
                var disable = false
                try {
                    disable = data.getBoolean("isDisable")
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
                            .replace("_", "")
                        node.vn = node.vn[0].lowercaseChar() + node.vn.substring(1) + node.index
                        devices += node
                    }
                } else if (shape == "logic-node") {
                    node = Logic()
                    node.index = logicCounter++
                    node.vn = "logic" + node.index
                    if (data.containsKey("events")) {
                        for (event in data.getJSONArray("events")) {
                            val e = event as JSONObject
                            val trigger = e.getString("key")
                            val code = e.getString("code")
                            node.events += Event(trigger, code)
                        }
                    }
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
                    } else if (shape == "logic-node") {
                        node.ports += Port(pid, name, left, pd, "")
                    }
                }
            }
        }
        cells.map {
            val cell = it as JSONObject
            if (!cell.containsKey("id")) return@map
            val id = cell.getString("id")
            if (cell.containsKey("source") && cell.containsKey("target")) {
                var source = cell.getJSONObject("source")
                var target = cell.getJSONObject("target")
                if (source.getString("port").split("-")[1] == "IN") {
                    val temp = source
                    source = target
                    target = temp
                }
                val sourceCell = source.getString("cell")
                val targetCell = target.getString("cell")
                val sourcePortKey = source.getString("port")
                val targetPortKey = target.getString("port")
                val disable = false

                var sourceNode: Node? = devices.find { it.id == sourceCell }
                var targetNode: Node? = devices.find { it.id == targetCell }
                if (sourceNode == null) sourceNode = logics.find { it.id == sourceCell }
                if (targetNode == null) targetNode = logics.find { it.id == targetCell }
                if (sourceNode == null || targetNode == null) return@map

                val sourcePort = sourceNode.ports.find { it.id == sourcePortKey } ?: return@map
                val targetPort = targetNode.ports.find { it.id == targetPortKey } ?: return@map
                edges += Edge(
                    id,
                    EdgePoint(sourceCell, sourcePortKey, getNodeVn(sourceNode), sourcePort.property),
                    EdgePoint(targetCell, targetPortKey, getNodeVn(targetNode), targetPort.property),
                    disable
                )
            }
        }

        var ddl = emptyArray<String>()
        var dpl = emptyArray<String>()
        devices.map {
            if (it.disable) {
                ddl += it.id
            }
            it.ports.map {itt ->
                if (!itt.disable) {
                    dpl += itt.id
                }
            }
        }
        edges = edges.filter { !it.disable }
        edges = edges.filter { !ddl.contains(it.source.cell) && !ddl.contains(it.target.cell) }
        edges = edges.filter { !dpl.contains(it.source.port) && !dpl.contains(it.target.port) }
        devices = devices.filter { !it.disable }

        edges.map {eit ->
            val sourceCellId = eit.source.cell
            val sourcePortId = eit.source.port
            val targetCellId = eit.target.cell
            val targetPortId = eit.target.port

            var sourceCell: Node? = devices.find { it.id == sourceCellId }
            var targetCell: Node? = devices.find { it.id == targetCellId }
            if (sourceCell == null) sourceCell = logics.find { it.id == sourceCellId } ?: return@map
            if (targetCell == null) targetCell = logics.find { it.id == targetCellId } ?: return@map
            val sourcePort = sourceCell.ports.find { it.id == sourcePortId } ?: return@map
            val targetPort = targetCell.ports.find { it.id == targetPortId } ?: return@map

            if (sourceCell is Device && targetCell is Logic) {
                targetCell.pdm[targetPort.name] = sourceCell.vn + "." + sourcePort.property
            } else if (sourceCell is Logic && targetCell is Device) {
                sourceCell.pdm[sourcePort.name] = targetCell.vn + "." + targetPort.property
            } else if (sourceCell is Logic && targetCell is Logic) {
                sourceCell.states += sourcePort.name
                targetCell.pdm[targetPort.name] = sourceCell.vn + "." + sourcePort.name
                sourceCell.pdm[sourcePort.name] = sourceCell.vn + "." + sourcePort.name
            }
        }
    }

    private fun getNodeVn(node: Node): String {
        if (node is Device) {
            return node.vn
        } else if (node is Logic) {
            return "Logic"
        }
        return "UNKNOWN"
    }

    private fun addProperty(property: Property) {
        val hp = properties.find { it.tal == property.tal && it.device == property.device }
        if (hp == null) {
            properties += property
        }
    }
}
