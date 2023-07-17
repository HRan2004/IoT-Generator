package com.hraps.iotgenerator.generate.mapper

object DeviceAndPortMap {
    var data: Array<DapmItem> = emptyArray()

    init {
        data += DapmItem(
            "Lamp(Home)",
            "Light",
            arrayOf(
                Property("Light", "开关", "switch", TalType("boolean")),
                Property("Light", "光照强度", "relativeBrightness", TalType("int:0,100")),
                Property("Light", "色温", "colorTemperature", TalType("1700,7000")),
                Property("Light", "亮度挡位", "relativeBrightness", TalType("int:0,100")),
                Property("Light", "RGB值", "RGB", TalType("object")),
            ),
        )
        data += DapmItem(
            "HumanMotionSensor",
            "HumanBodySensor",
            arrayOf(
                Property("HumanBodySensor", "是否有人", "existStatus", TalType("boolean"), permission = "rn"),
            ),
        )
        data += DapmItem(
            "DoorAndWindowSensor",
            "DoorAndWindowSensor",
            arrayOf(
                Property("DoorAndWindowSensor", "门窗状态", "status", TalType("boolean"), "rn"),
                Property("DoorAndWindowSensor", "设备电量", "power", TalType("int:0,100"), "rn"),
            ),
        )
        data += DapmItem(
            "HouseholdHumidifier",
            "HomeHumidifier",
            arrayOf(
                Property("HomeHumidifier", "开关", "switch", TalType("boolean")),
                Property("HomeHumidifier", "雾量档位", "sprayVolume", TalType("string:SMALL,MIDDLE,LARGE")),
                Property("HomeHumidifier", "当前湿度", "currentHumidity", TalType("int:0,100"), "rn"),
                Property("HomeHumidifier", "目标湿度值", "settledHumidity", TalType("int:0,100"), setFunctionName = "setHumidity"),
                Property("HomeHumidifier", "滤网寿命", "filterRemainTime", TalType("any"), "rn"),
                Property("HomeHumidifier", "水量值", "waterLevel", TalType("int:0,100"), "rn"),
            ),
        )
    }

    fun getItem(name: String): DapmItem? {
        return data.find { it.name == name }
    }
}
