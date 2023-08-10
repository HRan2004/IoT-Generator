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
                Property("Light", "额定功率", "ratedPower", TalType().fromText("float:0,1000,0.1"), "rn"),
                Property("Light", "呼吸灯模式", "breathingLightMode", TalType().fromText("boolean"), "rwn"),
                Property("Light", "断电记忆开关", "powerOffMemory", TalType().fromText("boolean"), "rwn"),
                Property("Light", "渐变开关", "switchingGradient", TalType().fromText("boolean"), "rwn"),

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
                Property("HomeHumidifier", "喷雾量（百分比）", "sprayVolumePercentage", TalType().fromText("int:0,100"), "wn"),

//                Property("HomeHumidifier", "童锁开关", "", TalType().fromText(""), "rwn"),
//                Property("HomeHumidifier", "缺水告警", "", TalType().fromText(""), "rn"),

//                Property("HomeHumidifier", "滤芯复位", "", TalType().fromText(""), "wn"),
//                Property("HomeHumidifier", "缺水阈值", "", TalType().fromText(""), "wn"),
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
                Property("HumanBodySensor", "报警条件", "alarmCondition", TalType().fromText("string:NO_MAN,OCCUPIED"), "rwn"),
                Property("HumanBodySensor", "报警开关", "alarmSwitch", TalType().fromText("boolean"), "rwn"),
                Property("HumanBodySensor", "蜂鸣器开关", "buzzerSwitch", TalType().fromText("boolean"), "rwn"),
                Property("HumanBodySensor", "触发延时（有人）", "existDelayedTime",    TalType().fromText("int:0,3600"), "rwn"),
                Property("HumanBodySensor", "触发延时（无人）", "notExistDelayedTime", TalType().fromText("int:0,3600"), "rwn"),
                Property("HumanBodySensor", "最小触发距离", "minTriggerDistance", TalType().fromText("int:0,1000"), "rwn"),
                Property("HumanBodySensor", "最大触发距离", "maxTriggerDistance", TalType().fromText("int:0,1000"), "rwn"),
                Property("HumanBodySensor", "光照度", "illuminationStrength", TalType().fromText("int:0,10000"), "rn"),
                Property("HumanBodySensor", "当前距离", "distance", TalType().fromText("int:0,1000"), "rn"),
            ),
        )
        data += DapmItem(
            "DoorAndWindowSensor",
            "DoorAndWindowSensor",
            arrayOf(
                Property("DoorAndWindowSensor", "门窗状态", "status", TalType().fromText("boolean"), "rn"),
                Property("DoorAndWindowSensor", "灵敏度", "sensitivity", TalType().fromText("string:HIGH,MIDDLE,LOW"), "rwn"),
                Property("DoorAndWindowSensor", "超时未关报警", "timeoutAlarmSwitch", TalType().fromText("boolean"), "rwn"),
                Property("DoorAndWindowSensor", "超时时间", "timeoutTime", TalType().fromText("int:0,86400"), "rwn"),
                Property("DoorAndWindowSensor", "解除防拆报警", "preventRemoveAlarm", TalType().fromText("none"), "wa"),
                Property("DoorAndWindowSensor", "防拆报警", "preventRemoveAlarm", TalType().fromText("boolean"), "rn"),
            ),
        )
    }

    fun getItem(name: String): DapmItem? {
        return data.find { it.name == name }
    }
}
