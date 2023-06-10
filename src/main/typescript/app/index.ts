import Property, {From} from "./property";
import Parser from "./parser";

let deviceManager: DeviceManager // Device Manager
let DSM: any = {} // Double State Manager

let light0: Light
let householdHumidifier2: HouseholdHumidifier

window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new DeviceManager(deviceArr)
    // Load devices sdk
    light0 = deviceManager.getLight('Lamp(Home)_0')
    householdHumidifier2 = deviceManager.getHouseholdHumidifier('HouseholdHumidifier_2')
    DSM.light0 = {
      onOff: new Property('light0', 'onOff'),
    }
    DSM.householdHumidifier2 = {
      onOff: new Property('householdHumidifier2', 'onOff'),
    }
    console.log('Device sdks loaded.\n')

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
  // Init set function
  DSM.light0.onOff.update = v => light0.setOnOff(Parser.parseToRemote(v))
  DSM.householdHumidifier2.onOff.update = v => householdHumidifier2.setOnOff(Parser.parseToRemote(v))
  // Init properties
  DSM.light0.onOff.setRemoteValue((await light0.getOnOff()).value)
  DSM.householdHumidifier2.onOff.setRemoteValue((await householdHumidifier2.getOnOff()).value)
  // Init remote receive
  light0.onReceive(data => {
    data.onOff = Parser.parseFromRemote(data.onOff)
    DSM.light0.onOff.setRemoteValue(data.onOff)
  })
  householdHumidifier2.onReceive(data => {
    data.onOff = Parser.parseFromRemote(data.onOff)
    DSM.householdHumidifier2.onOff.setRemoteValue(data.onOff)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  DSM.light0.onOff.addListener(value => {
    DSM.householdHumidifier2.onOff.setLocalValue(value, From.Local)
  })
}

