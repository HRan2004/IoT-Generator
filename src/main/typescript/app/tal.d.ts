
declare interface Window {
  methods: {
    onloadSdk(deviceArr: any[]): void
  }
}

declare interface TalResponse<T> {
  code: string
  message: string
  value: T
}

declare interface TalPromise<T = undefined> extends Promise<TalResponse<T>> {
}

declare class DeviceManager {
  constructor(deviceArr: any[])
  getHumanSensor_1(name: string): HumanSensor_1
  getLight(name: string): Light
  getHouseholdHumidifier(name: string): HouseholdHumidifier
  getDoorWindowSensor(name: string): DoorWindowSensor
  // getTemperatureHumiditysSensor(name: string): TemperatureHumiditysSensor
  // getMultiKeySwitch(name: string): MultiKeySwitch
}

declare class IotDevice {
  onReceive(f: (data: any) => void): void
}

declare class HumanSensor_1 extends IotDevice {
  setAlarmRemindOnOff(value: boolean): TalPromise
  setIndicatorLampOnOff(value: boolean): TalPromise
  setBuzzerOnOff(value: boolean): TalPromise
  setExistPeopleDelayedTime(value: number): TalPromise // 0~3600,1
  setNotExistPeopleDelayedTime(value: number): TalPromise // 0~3600,1
  setAlarmCondition(value: 'NO_MAN' | 'OCCUPIED'): TalPromise
  setShortestSparkOffDistance(value: number): TalPromise // 0~1000,1
  setLongestSparkOffDistance(value: number): TalPromise // 0~1000,1
  getAlarmRemindOnOff(): TalPromise<boolean>
  getIndicatorLampOnOff(): TalPromise<boolean>
  getBuzzerOnOff(): TalPromise<boolean>
  getExistStatus(): TalPromise<boolean>
  getDistance(): TalPromise<number> // 0~1000,1
  getIlluminationStrength(): TalPromise<number> // 0~10000,1
  getExistPeopleDelayedTime(): TalPromise<number> // 0~3600,1
  getNotExistPeopleDelayedTime(): TalPromise<number> // 0~3600,1
  getShortestSparkOffDistance(): TalPromise<number> // 0~1000,1
  getLongestSparkOffDistance(): TalPromise<number> // 0~1000,1
}

declare interface TalColor {
  RED: number
  GREEN: number
  BLUE: number
}

declare class Light extends IotDevice {
  setOnOff(value: boolean): TalPromise
  setRelativeBrightness(value: number): TalPromise // 0~100,1
  setAdaptionBrightness(value: number): TalPromise // 0~20000,1
  setTemperature(value: number): TalPromise // 1700~7000,1
  setIlluminationMode(value: 'COLD' | 'WARM'): TalPromise
  setSleepMode(value: boolean): TalPromise
  setNightMode(value: 'DAY' | 'NIGHT'): TalPromise
  setEyeProtectionMode(value: boolean): TalPromise
  setRGB(value: TalColor): TalPromise
  setBreathingLightMode(value: boolean): TalPromise
  setNonVolatileMemory(value: 'OPEN' | 'CLOSE' | 'MEMORY'): TalPromise
  setSwitchingGradient(value: boolean): TalPromise
  setSceneMode(value: 'NATURE'): TalPromise
  setShiningFrequency(value: number): TalPromise // 0~1000,1
  getOnOff(): TalPromise<boolean>
  getRelativeBrightness(): TalPromise<number> // 0~100,1
  getAdaptionBrightness(): TalPromise<number> // 0~20000,1
  getTemperature(): TalPromise<number> // 1700~7000,1
  getIlluminationMode(): TalPromise<'COLD' | 'WARM'>
  getSleepMode(): TalPromise<boolean>
  getNightMode(): TalPromise<'DAY' | 'NIGHT'>
  getEyeProtectionMode(): TalPromise<boolean>
  getRGB(): TalPromise<TalColor>
  getRatedPower(): TalPromise<number> // 0~1000,0.1
  getBreathingLightMode(): TalPromise<boolean>
  getNonVolatileMemory(): TalPromise<'OPEN' | 'CLOSE' | 'MEMORY'>
  getSwitchingGradient(): TalPromise<boolean>
  getSceneMode(): TalPromise<'NATURE'>
  getShiningFrequency(): TalPromise<number> // 0~1000,1
  getRealTimePower(): TalPromise<number> // 0~1000,0.1
}

declare class HouseholdHumidifier extends IotDevice {
  setOnOff(value: boolean): TalPromise
  setSprayOnOff(value: boolean): TalPromise
  setSprayVolume(volume: 'SMALL' | 'MIDDLE' | 'LARGE'): TalPromise
  setSprayMode(mode: 'CONTINUOUS' | 'INTERVAL' | 'AUTO'): TalPromise
  setSprayVolumePercentage(value: number): TalPromise // 0~100,1
  setHumidity(value: number): TalPromise // 0~100,1
  setLightOnOff(value: boolean): TalPromise
  setLightMode(mode: 'COLOR' | 'WHITE'): TalPromise
  setBacklightBrightness(value: number): TalPromise // 0~100,1
  setWarningToneOnOff(value: boolean): TalPromise
  setDegermingOnOff(value: boolean): TalPromise
  setChildLockOnOff(value: boolean): TalPromise
  setFilterCartridgeReset(): TalPromise
  setWorkModeOnOff(value: boolean): TalPromise
  setHealthModeOnOff(value: boolean): TalPromise
  setBabyModeOnOff(value: boolean): TalPromise
  setSleepModeOnOff(value: boolean): TalPromise
  setWaterThreshold(value: number): TalPromise // 0~100,1
  getOnOff(): TalPromise<boolean>
  getSprayOnOff(): TalPromise<boolean>
  getSprayVolume(): TalPromise<'SMALL' | 'MIDDLE' | 'LARGE'>
  getWaterLevel(): TalPromise<number> // 0~100,1
  getSprayMode(): TalPromise<'CONTINUOUS' | 'INTERVAL' | 'AUTO'>
  getCurrentHumidity(): TalPromise<number> // 0~100,1
  getSettedHumidity(): TalPromise<number> // 0~100,1
  getLightOnOff(): TalPromise<boolean>
  getLightMode(): TalPromise<'COLOR' | 'WHITE'>
  getBacklightBrightness(): TalPromise<number> // 0~100,1
  getWarningToneOnOff(): TalPromise<boolean>
  getDegermingOnOff(): TalPromise<boolean>
  // TODO 31 ?
  getSeparatewarningOnOff(): TalPromise<boolean>
  getFilterCartridgeRemainingTime(): TalPromise<number>
  getAchieveSettedHumidity(): TalPromise<boolean>
  getChildLockOnOff(): TalPromise<boolean>
}

declare class DoorWindowSensor extends IotDevice {
  setSensitivity(value: 'LOW' | 'MIDDLE' | 'HIGH'): TalPromise
  setOvertimeNotCloseAlarmOnoff(value: boolean): TalPromise
  setOvertimeTime(value: number): TalPromise // 0~86400,1
  stopTamperAlarm(): TalPromise
  getStatus(): TalPromise<boolean>
  getPower(): TalPromise<number> // 0~100,1
  getSensitivity(): TalPromise<'LOW' | 'MIDDLE' | 'HIGH'>
  getOvertimeNotCloseAlarmOnoff(): TalPromise<boolean>
  getOvertimeTime(): TalPromise<number> // 0~86400,1
  getIsOvertimeNotCloseAlarm(): TalPromise<boolean>
  getIsTamperAlarm(): TalPromise<boolean>
}

// declare class TemperatureHumiditysSensor extends Device {
//   getTemperature(): TalPromise<number>
//   getHumidity(): TalPromise<number>
// }
//
// declare interface SwitchStatus {
//   number: number
//   status: boolean
// }
//
// declare class MultiKeySwitch extends Device {
//   setStatus(status: MultiKeySwitch): TalPromise<boolean>
// }
