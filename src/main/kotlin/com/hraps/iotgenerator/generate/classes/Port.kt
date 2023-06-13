package com.hraps.iotgenerator.generate.classes

import com.hraps.iotgenerator.generate.mapper.Property

class Port (
    val id: String,
    val name: String = "",
    val left: Boolean = true,
    val disable: Boolean = false,
    val property: String = "",
)
