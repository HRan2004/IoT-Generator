import Manager, {Trigger} from "./manager";

let deviceManager: DeviceManager
let humanSensor: HumanSensor_1
let switch1: MultiKeySwitch

window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new DeviceManager(deviceArr)
    humanSensor = deviceManager.getHumanSensor_1('人体存在传感器3')
    // switch1 = deviceManager.getSwitch('开关')
    console.log('Device sdks loaded')

    try {
      main()
    } catch (e) {
      console.error('Run Error')
      console.warn(e)
    }
  },
}

async function main(): Promise<void> {
  const printHumanExist = async (): Promise<void> => {
    try {
      let res = await humanSensor.getExistStatus()
    } catch (e) {
      console.warn(e)
    }
  }

  Trigger.interval(printHumanExist, 1000)
}

