
export default class Device {
  tal = ""
  data: any = {}
  iotDevice: IotDevice
  properties = []
  
  constructor(iotDevice: IotDevice, data: any) {
    this.iotDevice = iotDevice
  }
}
