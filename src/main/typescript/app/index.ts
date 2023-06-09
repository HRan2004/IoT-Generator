import Manager, {Trigger} from "./manager"
import data from "./data"

let deviceManager: DeviceManager
let humanMotionSensor0: HumanSensor_1
let lampHome0: Light

window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new DeviceManager(deviceArr)
    humanMotionSensor0 = deviceManager.getHumanSensor_1('HumanMotionSensor_0')
    lampHome0 = deviceManager.getLight('Lamp(Home)_0')
    console.log('Device sdks loaded.\n')

    try {
      main().then(r => {})
    } catch (e) {
      console.error('Run Error')
      console.error(e)
    }
  },
}

async function main(): Promise<void> {
  }

