package com.hraps.iotgenerator.service.generate.mapper

object DeviceAndPortMap {
    var data: Array<DapmItem> = emptyArray()

    init {
        data += DapmItem(
            "Lamp(Home)",
            "Light",
            arrayOf(
                Property("开关", "onOff"),
                Property("光照强度", "relativeBrightness"),
                Property("色温", "temperature"),
                Property("亮度挡位", "relativeBrightness"),
                Property("RGB值", "RGB"),
            ),
        )
        data += DapmItem(
            "humanMotionSensor",
            "humanSensor_1",
            arrayOf(
                Property("是否有人", "existStatus"),
            ),
        )
        data += DapmItem(
            "DoorAndWindowSensor",
            "DoorWindowSensor",
            arrayOf(
                Property("门窗状态", "status", "rn"),
                Property("设备电量", "temperature", "rn"),
            ),
        )
        data += DapmItem(
            "HouseholdHumidifier",
            "HouseholdHumidifier",
            arrayOf(
                Property("开关", "onOff"),
                Property("雾量档位", "sprayVolume"),
                Property("当前湿度", "currentHumidity", "rn"),
                Property("目标湿度", "settedHumidity"),
                Property("滤网寿命", "filterCartridgeRemainingTime", "rn"),
                Property("水量值", "waterLevel", "rn"),
            ),
        )
    }

    fun getItem(name: String): DapmItem? {
        return data.find { it.name == name }
    }
}
