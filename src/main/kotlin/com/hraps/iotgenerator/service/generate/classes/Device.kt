package com.hraps.iotgenerator.service.generate.classes

class Device (
    override var id: String = "",
    override var ports: Array<Port> = emptyArray(),
    override var disable: Boolean = false,
    var name: String = "",
    var tal: String = "",
    var model: String = "",
): Node {
}
