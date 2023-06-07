package com.hraps.iotgenerator.service.generate.mapper

object DeviceAndPortMap {

    var data: Array<DapmItem> = emptyArray()

    init {
        data += DapmItem(
            "Lamp(Home)",
            "Light",
            hashMapOf(
                "开关" to "OnOff",
            ),
        )
        data += DapmItem(
            "HumanMotionSensor",
            "HumanSensor_1",
            hashMapOf(
                "是否有人" to "ExistStatus",
            ),
        )
    }
}