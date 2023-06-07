package com.hraps.iotgenerator.service.generate.classes

interface Node {
    var id: String
    var ports: Array<Port>
    var disable: Boolean
}
