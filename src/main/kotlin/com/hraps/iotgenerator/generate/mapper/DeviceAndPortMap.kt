package com.hraps.iotgenerator.generate.mapper

object DeviceAndPortMap {
    var data: Array<DapmItem> = emptyArray()

    init {
        data += DapmItem(
            "Lamp(Home)",
            "Light",
            arrayOf(
                Property("Light", "开关", "onOff"),
                Property("Light", "光照强度", "relativeBrightness"),
                Property("Light", "色温", "temperature"),
                Property("Light", "亮度挡位", "relativeBrightness"),
                Property("Light", "RGB值", "RGB"),
            ),
        )
        data += DapmItem(
            "humanMotionSensor",
            "humanSensor_1",
            arrayOf(
                Property("humanSensor_1", "是否有人", "existStatus"),
            ),
        )
        data += DapmItem(
            "DoorAndWindowSensor",
            "DoorWindowSensor",
            arrayOf(
                Property("DoorWindowSensor", "门窗状态", "status", "rn"),
                Property("DoorWindowSensor", "设备电量", "temperature", "rn"),
            ),
        )
        data += DapmItem(
            "HouseholdHumidifier",
            "HouseholdHumidifier",
            arrayOf(
                Property("HouseholdHumidifier", "开关", "onOff"),
                Property("HouseholdHumidifier", "雾量档位", "sprayVolume"),
                Property("HouseholdHumidifier", "当前湿度", "currentHumidity", "rn"),
                Property("HouseholdHumidifier", "目标湿度", "settedHumidity"),
                Property("HouseholdHumidifier", "滤网寿命", "filterCartridgeRemainingTime", "rn"),
                Property("HouseholdHumidifier", "水量值", "waterLevel", "rn"),
            ),
        )
    }

    fun getItem(name: String): DapmItem? {
        return data.find { it.name == name }
    }
}
