package com.hraps.iotgenerator.generate.mapper

object DeviceAndPortMap {
    var data: Array<DapmItem> = emptyArray()

    init {
        data += DapmItem(
            "Lamp(Home)",
            "Light",
            arrayOf(
                Property("Light", "开关", "switch", TalType().fromText("boolean")),
                Property("Light", "光照强度", "relativeBrightness", TalType().fromText("int:0,100")),
                Property("Light", "色温", "colorTemperature", TalType().fromText("int:1700,7000")),
                Property("Light", "亮度挡位", "relativeBrightness", TalType().fromText("int:0,100")),
                Property("Light", "RGB值", "RGB", TalType().fromText("object")),
            ),
        )
        data += DapmItem(
            "HumanMotionSensor",
            "HumanBodySensor",
            arrayOf(
                Property("HumanBodySensor", "是否有人", "existStatus", TalType().fromText("boolean"), permission = "rn"),
            ),
        )
        data += DapmItem(
            "DoorAndWindowSensor",
            "DoorAndWindowSensor",
            arrayOf(
                Property("DoorAndWindowSensor", "门窗状态", "status", TalType().fromText("boolean"), "rn"),
                Property("DoorAndWindowSensor", "设备电量", "power", TalType().fromText("int:0,100"), "rn"),
            ),
        )
        data += DapmItem(
            "HouseholdHumidifier",
            "HomeHumidifier",
            arrayOf(
                Property("HomeHumidifier", "开关", "switch", TalType().fromText("boolean")),
                Property("HomeHumidifier", "雾量档位", "sprayVolume", TalType().fromText("string:LOW,MIDDLE,HIGH")),
                Property("HomeHumidifier", "当前湿度", "currentHumidity", TalType().fromText("int:0,100"), "rn"),
                Property("HomeHumidifier", "目标湿度值", "settledHumidity", TalType().fromText("int:0,100"), setFunctionName = "setHumidity"),
                Property("HomeHumidifier", "滤网寿命", "filterRemainTime", TalType().fromText("any"), "rn"),
                Property("HomeHumidifier", "水量值", "waterLevel", TalType().fromText("int:0,100"), "rn"),
            ),
        )
    }

    fun getItem(name: String): DapmItem? {
        return data.find { it.name == name }
    }
}
