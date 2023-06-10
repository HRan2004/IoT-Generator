package com.hraps.iotgenerator.service.generate.classes

class Edge (
    val id: String,
    val source: EdgePoint,
    val target: EdgePoint,
    val disable: Boolean = false,
)

class EdgePoint (
    val cell: String,
    val port: String,
    val device: String = "",
    val property: String = "",
)
