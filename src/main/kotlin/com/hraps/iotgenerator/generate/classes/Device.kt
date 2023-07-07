package com.hraps.iotgenerator.generate.classes

import com.hraps.iotgenerator.generate.mapper.Property

class Device (
    override var id: String = "",
    override var ports: Array<Port> = emptyArray(),
    override var disable: Boolean = false,
    var name: String = "",
    var vn: String = "",
    var index: Int = 0,
    var tal: String = "",
    var model: String = "",
): Node