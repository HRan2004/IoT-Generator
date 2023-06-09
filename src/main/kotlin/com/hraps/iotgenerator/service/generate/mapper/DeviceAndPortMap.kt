package com.hraps.iotgenerator.service.generate.mapper

object DeviceAndPortMap {

    var data: Array<DapmItem> = emptyArray()

    init {
        data += DapmItem(
            "Lamp(Home)",
            "Light",
            hashMapOf(
                "开关" to "onOff",
                "光照强度" to "relativeBrightness",
                "色温" to "temperature",
                "亮度挡位" to "relativeBrightness",
                "RGB值" to "RGB",
            ),
        )
        data += DapmItem(
            "humanMotionSensor",
            "humanSensor_1",
            hashMapOf(
                "是否有人" to "existStatus",
            ),
        )
        data += DapmItem(
            "DoorAndWindowSensor",
            "DoorWindowSensor",
            hashMapOf(
                "门窗状态" to "status",
                "设备电量" to "t emperature",
            ),
        )
        data += DapmItem(
            "HouseholdHumidifier",
            "HouseholdHumidifier",
            hashMapOf(
                "开关" to "onOff",
                "雾量档位" to "sprayVolume",
                "当前湿度" to "currentHumidity",
                "目标湿度" to "settedHumidity",
                "滤网寿命" to "filterCartridgeRemainingTime",
                "水量值" to "waterLevel",
            ),
        )
    }

    fun getItem(name: String): DapmItem? {
        return data.find { it.name == name }
    }
}