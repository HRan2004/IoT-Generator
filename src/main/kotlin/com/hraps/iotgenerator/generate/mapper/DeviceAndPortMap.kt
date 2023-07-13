package com.hraps.iotgenerator.generate.mapper

object DeviceAndPortMap {
    var data: Array<DapmItem> = emptyArray()

    init {
        data += DapmItem(
            "Lamp(Home)",
            "Light",
            arrayOf(
                Property("Light", "开关", "switch"),
                Property("Light", "光照强度", "relativeBrightness"),
                Property("Light", "色温", "colorTemperature"),
                Property("Light", "亮度挡位", "relativeBrightness"),
                Property("Light", "RGB值", "RGB"),
            ),
        )
        data += DapmItem(
            "humanMotionSensor",
            "HumanBodySensor",
            arrayOf(
                Property("HumanBodySensor", "是否有人", "existStatus"),
            ),
        )
        data += DapmItem(
            "DoorAndWindowSensor",
            "DoorAndWindowSensor",
            arrayOf(
                Property("DoorAndWindowSensor", "门窗状态", "status", "rn"),
                Property("DoorAndWindowSensor", "设备电量", "power", "rn"),
            ),
        )
        data += DapmItem(
            "HouseholdHumidifier",
            "HomeHumidifier",
            arrayOf(
                Property("HomeHumidifier", "开关", "switch"),
                Property("HomeHumidifier", "雾量档位", "sprayVolume"),
                Property("HomeHumidifier", "当前湿度", "currentHumidity", "rn"),
                Property("HomeHumidifier", "目标湿度", "settledHumidity"),
                Property("HomeHumidifier", "滤网寿命", "filterRemainTime", "rn"),
                Property("HomeHumidifier", "水量值", "waterLevel", "rn"),
            ),
        )
    }

    fun getItem(name: String): DapmItem? {
        return data.find { it.name == name }
    }
}
