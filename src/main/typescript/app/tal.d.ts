
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

declare class Device {
  onReceive(f: (data: any) => void): void
}

declare class DeviceOnOff extends Device {
  setOnOff(status: boolean): TalPromise
  getOnOff(): TalPromise<boolean>
}

declare interface SwitchStatus {
  number: number
  status: boolean
}

declare class MultiKeySwitch extends Device {
  setStatus(status: MultiKeySwitch): TalPromise<boolean>
}

declare class HumanSensor_1 extends Device {
  getExistStatus(): TalPromise<boolean>
}

declare class Light extends DeviceOnOff {
}

declare class TemperatureHumiditysSensor extends Device {
  getTemperature(): TalPromise<number>
  getHumidity(): TalPromise<number>
}

declare class HouseholdHumidifier extends DeviceOnOff {
  setSprayVolume(volume: 'SMALL' | 'MIDDLE' | 'LARGE'): TalPromise
}

declare class DeviceManager {
  constructor(deviceArr: any[])
  getMultiKeySwitch(name: string): MultiKeySwitch
  getHumanSensor_1(name: string): HumanSensor_1
  getLight(name: string): Light
  getTemperatureHumiditysSensor(name: string): TemperatureHumiditysSensor
  getHouseholdHumidifier(name: string): HouseholdHumidifier
}
