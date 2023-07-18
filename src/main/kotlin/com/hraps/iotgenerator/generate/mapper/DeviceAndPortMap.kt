package com.hraps.iotgenerator.generate.mapper

object DeviceAndPortMap {
    var data: Array<DapmItem> = emptyArray()

    init {
        data += DapmItem(
            "Light",
            "Light",
            arrayOf(
                Property("Light", "开关", "switch", TalType().fromText("boolean")),
                Property("Light", "亮度（相对）", "relativeBrightness", TalType().fromText("int:0,100")),
                Property("Light", "亮度（绝对）", "absoluteBrightness", TalType().fromText("int:0:1000")),
                Property("Light", "色温", "colorTemperature", TalType().fromText("int:1700,7000")),
                Property("Light", "光照模式", "illuminationMode", TalType().fromText("string:COLD,WARM")),
                Property("Light", "睡眠模式", "sleepMode", TalType().fromText("boolean")),
                Property("Light", "夜间模式", "nightMode", TalType().fromText("boolean")),
                Property("Light", "护眼模式", "eyeProtectionMode", TalType().fromText("boolean")),
                Property("Light", "RGB值", "RGB", TalType().fromText("object")),
                Property("Light", "额定功率", "ratedPower", TalType().fromText(""), "rn"),
                Property("Light", "呼吸灯模式", "breathingLightMode", TalType().fromText("boolean"), "rwn"),
                Property("Light", "断电记忆是否开启", "powerOffMemory", TalType().fromText(""), "rwn"),

//                Property("Light", "开关渐变", "", TalType().fromText(""), "rwn"),
//                Property("Light", "场景模式", "", TalType().fromText(""), "rwn"),
//                Property("Light", "亮闪频率", "", TalType().fromText(""), "rwn"),
//                Property("Light", "饱和度", "", TalType().fromText(""), "rwn"),
//                Property("Light", "实时功率", "", TalType().fromText(""), "rn"),
            ),
        )
        data += DapmItem(
            "HomeHumidifier",
            "HomeHumidifier",
            arrayOf(
                Property("HomeHumidifier", "开关", "switch", TalType().fromText("boolean")),
                Property("HomeHumidifier", "喷雾开关", "spraySwitch", TalType().fromText("boolean"), "rwn"),
                Property("HomeHumidifier", "喷雾量", "sprayVolume", TalType().fromText("string:LOW,MIDDLE,HIGH"), "rwn"),
                Property("HomeHumidifier", "喷雾模式", "sprayMode", TalType().fromText("string:MANUAL,AUTO,HEALTH,BABY,SLEEP,CONTINUE,INTERVAL"), "rwn"),
                Property("HomeHumidifier", "当前水位", "waterLevel", TalType().fromText("int:0,100"), "rn"),
                Property("HomeHumidifier", "当前湿度", "currentHumidity", TalType().fromText("int:0,100"), "rn"),
                Property("HomeHumidifier", "湿度", "humidity", TalType().fromText("int:0,100")),
                Property("HomeHumidifier", "灯光开关", "lightSwitch", TalType().fromText("boolean"), "rwn"),
                Property("HomeHumidifier", "灯光模式", "lightMode", TalType().fromText("string:WHITE,COLOR"), "rwn"),
                Property("HomeHumidifier", "背光亮度", "backlightBrightness", TalType().fromText("int:0,100"), "rwn"),
                Property("HomeHumidifier", "提示音", "warningToneSwitch", TalType().fromText("boolean"), "rwn"),
                Property("HomeHumidifier", "除菌开关", "sterilizationSwitch", TalType().fromText("boolean"), "rwn"),

//                Property("HomeHumidifier", "喷雾量（百分比）", "", TalType().fromText(""), "rwn"),
//                Property("HomeHumidifier", "童锁开关", "", TalType().fromText(""), "rwn"),
//                Property("HomeHumidifier", "滤芯复位", "", TalType().fromText(""), "wn"),
//                Property("HomeHumidifier", "缺水阈值", "", TalType().fromText(""), "wn"),
//                Property("HomeHumidifier", "缺水告警", "", TalType().fromText(""), "rn"),
//                Property("HomeHumidifier", "分离告警", "", TalType().fromText(""), "rn"),
//                Property("HomeHumidifier", "滤芯剩余可用时间", "filterRemainTime", TalType().fromText("any"), "rn"),
//                Property("HomeHumidifier", "是否达到目标湿度", "", TalType().fromText(""), "rn"),
            ),
        )
        data += DapmItem(
            "HumanBodySensor",
            "HumanBodySensor",
            arrayOf(
                Property("HumanBodySensor", "存在状态", "existStatus", TalType().fromText("boolean"), "rn"),
                Property("HumanBodySensor", "指示灯开关", "indicatorSwitch", TalType().fromText("boolean"), "rwn"),
                Property("HumanBodySensor", "报警条件", "alarmSwitch", TalType().fromText("boolean"), "rwn"),
                Property("HumanBodySensor", "报警状态", "", TalType().fromText("boolean"), "rn"),
                Property("HumanBodySensor", "蜂鸣器开关", "buzzerSwitch", TalType().fromText("boolean"), "rwn"),
                Property("HumanBodySensor", "触发延时（有人）", "", TalType().fromText(""), "rwn"),
                Property("HumanBodySensor", "触发延时（无人）", "", TalType().fromText(""), "rwn"),
                Property("HumanBodySensor", "最小触发距离", "", TalType().fromText(""), "rwn"),
                Property("HumanBodySensor", "最大触发距离", "", TalType().fromText(""), "rwn"),
            ),
        )
        data += DapmItem(
            "DoorAndWindowSensor",
            "DoorAndWindowSensor",
            arrayOf(
                Property("DoorAndWindowSensor", "门窗状态", "status", TalType().fromText("boolean"), "rn"),
                Property("DoorAndWindowSensor", "灵敏度", "", TalType().fromText(""), "rwn"),
                Property("DoorAndWindowSensor", "超时未关报警开关", "", TalType().fromText(""), "rwn"),
                Property("DoorAndWindowSensor", "超时时间", "", TalType().fromText(""), "rwn"),
                Property("DoorAndWindowSensor", "解除防拆报警", "", TalType().fromText(""), "rwn"),
                Property("DoorAndWindowSensor", "防拆报警", "", TalType().fromText(""), "rn"),
            ),
        )
    }

    fun getItem(name: String): DapmItem? {
        return data.find { it.name == name }
    }
}
