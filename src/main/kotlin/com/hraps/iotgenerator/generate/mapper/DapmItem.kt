package com.hraps.iotgenerator.generate.mapper

class DapmItem (
    val name: String = "",
    val tal: String = "",
    private val properties: Array<Property> = emptyArray(),
) {
    fun getProperty(name: String): Property? {
        return properties.find { it.name == name }
    }
}


