package com.hraps.iotgenerator.service.generate.classes

class Edge (
    val id: String,
    val source: String = "",
    val target: String = "",
    val sourcePort: String = "",
    val targetPort: String = "",
    val disable: Boolean = false,
)