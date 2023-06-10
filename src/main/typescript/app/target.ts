import Property, {From} from "./property";
import Parser from "./parser";

let deviceManager: DeviceManager // Device Manager
let DSM: any = {}// Double State Manager

let light0: Light
let humanSensor1: HumanSensor_1
let householdHumidifier2: HouseholdHumidifier

window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new DeviceManager(deviceArr)
    // Load devices sdk
    light0 = deviceManager.getLight('Lamp(Home)_0')
    humanSensor1 = deviceManager.getHumanSensor_1('HumanMotionSensor_1')
    householdHumidifier2 = deviceManager.getHouseholdHumidifier('HouseholdHumidifier_2')
    DSM.light0 = {
      onOff: new Property("light0", "onOff", v => light0.setOnOff(Parser.parseToRemote(v))),
    }
    DSM.humanSensor1 = {
      existStatus: new Property("humanSensor1", "existStatus")
    }
    DSM.householdHumidifier2 = {
      onOff: new Property("householdHumidifier2", "onOff", v => householdHumidifier2.setOnOff(Parser.parseToRemote(v))),
    }
    console.log('Devices sdk loaded.\n')
    
    try {
      init().then(r => {
        console.log('Init Success.')
        try {
          main().then(r => {})
        } catch (e) {
          console.error('Run Error.')
          console.error(e)
        }
      })
    } catch (e) {
      console.error('Init Error.')
      console.error(e)
    }
  },
}

// Init function
async function init(): Promise<void> {
  // Init properties
  DSM.humanSensor1.existStatus.setRemoteValue((await humanSensor1.getExistStatus()).value, From.Device)
  DSM.light0.onOff.setRemoteValue((await light0.getOnOff()).value, From.Device)
  DSM.householdHumidifier2.onOff.setRemoteValue((await householdHumidifier2.getOnOff()).value, From.Device)
  // Init remote receive
  humanSensor1.onReceive(data => {
    data.existStatus = Parser.parseFromRemote(data.existStatus)
    DSM.humanSensor1.existStatus.setRemoteValue(data.existStatus, From.Device)
  })
  light0.onReceive(data => {
    data.onOff = Parser.parseFromRemote(data.onOff)
    DSM.light0.onOff.setRemoteValue(data.onOff, From.Device)
  })
  householdHumidifier2.onReceive(data => {
    data.onOff = Parser.parseFromRemote(data.onOff)
    DSM.householdHumidifier2.onOff.setRemoteValue(data.onOff, From.Device)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  DSM.humanSensor1.existStatus.addListener(value => {
    DSM.light0.onOff.setLocalValue(value, From.Local)
  })
  DSM.light0.onOff.addListener(value => {
    DSM.householdHumidifier2.onOff.setLocalValue(value, From.Local)
  })
}

