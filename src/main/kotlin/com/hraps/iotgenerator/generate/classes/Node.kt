package com.hraps.iotgenerator.generate.classes

interface Node {
    var id: String
    var ports: Array<Port>
    var disable: Boolean
}
