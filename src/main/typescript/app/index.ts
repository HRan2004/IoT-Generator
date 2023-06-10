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
      com.hraps.iotgenerator.service.generate.mapper.Property@6b419da: new Property('light0', 'com.hraps.iotgenerator.service.generate.mapper.Property@6b419da'),
    }
    DSM.householdHumidifier2 = {
      com.hraps.iotgenerator.service.generate.mapper.Property@3b2da18f: new Property('householdHumidifier2', 'com.hraps.iotgenerator.service.generate.mapper.Property@3b2da18f'),
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
  // Init properties
  /* GENERATE INIT PROPERTY */
  // Init remote receive
  /* GENERATE PROPERTY REMOTE RECEIVE */
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  /* GENERATE DEVICE BIND */
}

