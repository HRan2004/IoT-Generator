package com.hraps.iotgenerator.service.generate.classes

open class Node (
    open var id: String = "",
    open val ports: Array<Port> = emptyArray(),
    open var disable: Boolean = false,
) {
}