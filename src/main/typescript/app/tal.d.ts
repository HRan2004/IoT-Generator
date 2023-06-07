
declare interface Window {
  methods: {
    onloadSdk(deviceArr: any[]): void
  }
}

declare class TalResponse {
  value: any
}

declare class HumanSensor_1 {
  getExistStatus(): Promise<TalResponse>
}

declare class DeviceManager {
  constructor(deviceArr: any[])
  getHumanSensor_1(name: string): HumanSensor_1
}
