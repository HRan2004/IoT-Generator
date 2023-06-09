package com.hraps.iotgenerator.service.generate.mapper

object DeviceAndPortMap {

    var data: Array<DapmItem> = emptyArray()

    init {
        data += DapmItem(
            "Lamp(Home)",
            "Light",
            hashMapOf(
                "开关" to "OnOff",
                "光照强度" to "RelativeBrightness",
                "色温" to "Temperature",
                "亮度挡位" to "RelativeBrightness",
                "RGB值" to "RGB",
            ),
        )
        data += DapmItem(
            "HumanMotionSensor",
            "HumanSensor_1",
            hashMapOf(
                "是否有人" to "ExistStatus",
            ),
        )
        data += DapmItem(
            "DoorAndWindowSensor",
            "DoorWindowSensor",
            hashMapOf(
                "门窗状态" to "Status",
                "设备电量" to "Temperature",
            ),
        )
        data += DapmItem(
            "HouseholdHumidifier",
            "HouseholdHumidifier",
            hashMapOf(
                "开关" to "OnOff",
                "雾量档位" to "setSprayVolume",
                "当前湿度" to "CurrentHumidity",
                "目标湿度" to "SettedHumidity",
                "滤网寿命" to "FilterCartridgeRemainingTime",
                "水量值" to "WaterLevel",
            ),
        )
    }

    fun getItem(name: String): DapmItem? {
        return data.find { it.name == name }
    }
}