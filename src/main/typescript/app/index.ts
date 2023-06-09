import Manager, {Trigger} from "./manager"
import {data} from "./data"
import {UNKNOWN} from "./const";

let deviceManager: DeviceManager
let humanSensor0: HumanSensor_1
let light1: Light

window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new DeviceManager(deviceArr)
    humanSensor0 = deviceManager.getHumanSensor_1('HumanMotionSensor_0')
    light1 = deviceManager.getLight('Lamp(Home)_1')
    console.log('Device sdks loaded.\n')

    try {
      main().then(r => {})
    } catch (e) {
      console.error('Run Error')
      console.error(e)
    }
  },
}

let state: any = {
  humanSensor0: {
    existStatus: UNKNOWN
  }
}

async function main(): Promise<void> {
  state.humanSensor0.existStatus = (await humanSensor0.getExistStatus()).value
  humanSensor0.onReceive(data => {
    state.humanSensor0.existStatus = data.existStatus
  })
}

