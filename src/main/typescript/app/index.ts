import Manager, {Trigger} from "./manager"
import {data} from "./data"
import {UNKNOWN} from "./const";

let deviceManager: DeviceManager
let light0: Light
let humanSensor1: HumanSensor_1
let householdHumidifier2: HouseholdHumidifier

window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new DeviceManager(deviceArr)
    light0 = deviceManager.getLight('Lamp(Home)_0')
    humanSensor1 = deviceManager.getHumanSensor_1('HumanMotionSensor_1')
    householdHumidifier2 = deviceManager.getHouseholdHumidifier('HouseholdHumidifier_2')
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
  humanSensor1: {
    existStatus: UNKNOWN
  }
}

async function main(): Promise<void> {
  state.humanSensor1.existStatus = (await humanSensor1.getExistStatus()).value
  humanSensor1.onReceive(data => {
    state.humanSensor1.existStatus = data.existStatus
  })
}

