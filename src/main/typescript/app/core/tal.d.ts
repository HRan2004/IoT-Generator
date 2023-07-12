
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
  static createHumanBodySensor(name: string): HumanBodySensor
  static createLight(name: string): Light
  static createHomeHumidifier(name: string): HomeHumidifier
  static createDoorAndWindowSensor(name: string): DoorAndWindowSensor
}

declare class IotDevice {
  subscribe(f: (data: any) => void): void
}

declare class HumanBodySensor extends IotDevice {
  setAlarmSwitch(value: boolean): TalPromise
  setIndicatorSwitch(value: boolean): TalPromise
  setBuzzerSwitch(value: boolean): TalPromise
  setExistDelayedTime(value: number): TalPromise // 0~3600,1
  setNotExistDelayedTime(value: number): TalPromise // 0~3600,1
  setAlarmCondition(value: 'NO_MAN' | 'OCCUPIED'): TalPromise
  setMinTriggerDistance(value: number): TalPromise // 0~1000,1
  setMaxTriggerDistance(value: number): TalPromise // 0~1000,1
  getAlarmCondition(): TalPromise<boolean>
  getAlarmSwitch(): TalPromise<boolean>
  getBuzzerSwitch(): TalPromise<boolean>
  getExistStatus(): TalPromise<boolean>
  getDistance(): TalPromise<number> // 0~1000,1
  getIlluminationStrength(): TalPromise<number> // 0~10000,1
  getExistDelayedTime(): TalPromise<number> // 0~3600,1
  getNotExistDelayedTime(): TalPromise<number> // 0~3600,1
  getMinTriggerDistance(): TalPromise<number> // 0~1000,1
  getMaxTriggerDistance(): TalPromise<number> // 0~1000,1
}

declare interface TalColor {
  RED: number
  GREEN: number
  BLUE: number
}

declare class Light extends IotDevice {
  setSwitch(value: boolean): TalPromise
  setRelativeBrightness(value: number): TalPromise // 0~100,1
  setAbsoluteBrightness(value: number): TalPromise // 0~20000,1
  setColorTemperature(value: number): TalPromise // 1700~7000,1
  setIlluminationMode(value: 'COLD' | 'WARM'): TalPromise
  setSleepMode(value: boolean): TalPromise
  setNightMode(value: 'DAY' | 'NIGHT'): TalPromise
  setEyeProtectionMode(value: boolean): TalPromise
  setRGB(value: TalColor): TalPromise
  setBreathingLightMode(value: boolean): TalPromise
  setPowerOffMemory(value: 'OPEN' | 'CLOSE' | 'MEMORY'): TalPromise
  setSwitchingGradient(value: boolean): TalPromise
  setSceneMode(value: 'NATURE'): TalPromise
  setShiningFrequency(value: number): TalPromise // 0~1000,1
  setSaturation(value: number): TalPromise // 0,100,1
  getSwitch(): TalPromise<boolean>
  getRelativeBrightness(): TalPromise<number> // 0~100,1
  getAdaptionBrightness(): TalPromise<number> // 0~20000,1
  getColorTemperature(): TalPromise<number> // 1700~7000,1
  getIlluminationMode(): TalPromise<'COLD' | 'WARM'>
  getSleepMode(): TalPromise<boolean>
  getNightMode(): TalPromise<'DAY' | 'NIGHT'>
  getEyeProtectionMode(): TalPromise<boolean>
  getRGB(): TalPromise<TalColor>
  getRatedPower(): TalPromise<number> // 0~1000,0.1
  getBreathingLightMode(): TalPromise<boolean>
  getPowerOffMemory(): TalPromise<'OPEN' | 'CLOSE' | 'MEMORY'>
  getSwitchingGradient(): TalPromise<boolean>
  getSceneMode(): TalPromise<'NATURE'>
  getShiningFrequency(): TalPromise<number> // 0~1000,1
  getRealTimePower(): TalPromise<number> // 0~1000,0.1
  getSaturation(): TalPromise<number> // 0,100,1
}

declare class HomeHumidifier extends IotDevice {
  setSwitch(value: boolean): TalPromise
  setSpraySwitch(value: boolean): TalPromise
  setSprayVolume(volume: 'SMALL' | 'MIDDLE' | 'LARGE'): TalPromise
  setSprayMode(mode: 'CONTINUOUS' | 'INTERVAL' | 'AUTO'): TalPromise
  setSprayVolumePercentage(value: number): TalPromise // 0~100,1
  setHumidity(value: number): TalPromise // 0~100,1
  setLightSwitch(value: boolean): TalPromise
  setLightMode(mode: 'COLOR' | 'WHITE'): TalPromise
  setBacklightBrightness(value: number): TalPromise // 0~100,1
  setWarningToneSwitch(value: boolean): TalPromise
  setSterilizationSwitch(value: boolean): TalPromise
  setChildLockSwitch(value: boolean): TalPromise
  setFilterToDefault(): TalPromise
  setWaterShortageThreshold(value: number): TalPromise // 0~100,1
  getSwitch(): TalPromise<boolean>
  getSpraySwitch(): TalPromise<boolean>
  getSprayVolume(): TalPromise<'SMALL' | 'MIDDLE' | 'LARGE'>
  getWaterLevel(): TalPromise<number> // 0~100,1
  getSprayMode(): TalPromise<'CONTINUOUS' | 'INTERVAL' | 'AUTO'>
  getCurrentHumidity(): TalPromise<number> // 0~100,1
  getSettledHumidity(): TalPromise<number> // 0~100,1
  getLightSwitch(): TalPromise<boolean>
  getLightMode(): TalPromise<'COLOR' | 'WHITE'>
  getBacklightBrightness(): TalPromise<number> // 0~100,1
  getWarningToneSwitch(): TalPromise<boolean>
  getSterilizationSwitch(): TalPromise<boolean>
  getWaterShortageAlarm(): TalPromise<boolean>
  getSeparationAlarm(): TalPromise<boolean>
  getFilterRemainTime(): TalPromise<number>
  getAchieveSettledHumidity(): TalPromise<boolean>
  getChildLockSwitch(): TalPromise<boolean>
}

declare class DoorAndWindowSensor extends IotDevice {
  setSensitivity(value: 'LOW' | 'MIDDLE' | 'HIGH'): TalPromise
  setTimeoutAlarmSwitch(value: boolean): TalPromise
  setTimeout(value: number): TalPromise // 0~86400,1
  setPreventRemoveAlarm(): TalPromise
  getStatus(): TalPromise<boolean>
  getPower(): TalPromise<number> // 0~100,1
  getSensitivity(): TalPromise<'LOW' | 'MIDDLE' | 'HIGH'>
  getTimeoutAlarmSwitch(): TalPromise<boolean>
  getTimeout(): TalPromise<number> // 0~86400,1
  getTimeoutAlarmStatus(): TalPromise<boolean>
  getPreventRemoveAlarm(): TalPromise<boolean>
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
