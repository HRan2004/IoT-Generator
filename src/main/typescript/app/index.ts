import Property, {From} from "./property";
import Parser from "./parser";

let DSM: any = {} // Double State Manager

let doorAndWindowSensor0: DoorAndWindowSensor
let light1: Light

window.methods = {
  onloadSdk(deviceArr) {
    // Load devices sdk
    doorAndWindowSensor0 = DeviceManager.createDoorAndWindowSensor('DoorAndWindowSensor_0')
    light1 = DeviceManager.createLight('Lamp(Home)_1')
    DSM.doorWindowSensor0 = {
      status: new Property('doorWindowSensor0', 'status'),
    }
    DSM.light1 = {
      onOff: new Property('light1', 'onOff'),
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
  DSM.light1.onOff.update = v => light1.setSwitch(Parser.parseToRemote(v))
  // Init properties
  DSM.doorWindowSensor0.status.setRemoteValue((await doorAndWindowSensor0.getStatus()).value)
  DSM.light1.onOff.setRemoteValue((await light1.getSwitch()).value)
  // Init remote receive
  doorAndWindowSensor0.subscribe(data => {
    data.status = Parser.parseFromRemote(data.status)
    DSM.doorWindowSensor0.status.setRemoteValue(data.status)
  })
  light1.subscribe(data => {
    data.onOff = Parser.parseFromRemote(data.onOff)
    DSM.light1.onOff.setRemoteValue(data.onOff)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  DSM.doorWindowSensor0.status.addListener(value => {
    DSM.light1.onOff.setLocalValue(value, From.Local)
  })
}

