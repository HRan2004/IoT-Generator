package com.hraps.iotgenerator.service.generate.classes

import com.hraps.iotgenerator.service.generate.mapper.Property

class Port (
    val id: String,
    val name: String = "",
    val left: Boolean = true,
    val disable: Boolean = false,
    val tal: Property = Property(),
)
