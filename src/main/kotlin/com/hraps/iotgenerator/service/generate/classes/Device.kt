package com.hraps.iotgenerator.service.generate.classes

class Device (
    override var id: String = "",
    override val ports: Array<Port> = emptyArray(),
    override var disable: Boolean = false,
    var name: String = "",
    var tal: String = "",
    var model: String = "",
): Node(id, ports, disable) {
}
