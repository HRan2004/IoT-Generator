package com.hraps.iotgenerator.service.generate.classes

class Device (
    override val id: String = "",
    override val ports: Array<Port> = emptyArray(),
    override val disable: Boolean = false,
    val name: String = "",
    val model: String = "",
    val tal: String = "",
): Node(id, ports, disable) {
}
