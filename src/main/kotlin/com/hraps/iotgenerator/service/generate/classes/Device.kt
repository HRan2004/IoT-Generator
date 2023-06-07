package com.hraps.iotgenerator.service.generate.classes

class Device (
    val id: String,
    val name: String = "",
    val ports: Array<Port> = emptyArray(),
    val disable: Boolean = false,
    val model: String = "",
    val tal: String = "",
)