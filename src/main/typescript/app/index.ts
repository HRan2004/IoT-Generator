import Property, {From} from "./property";
import Parser from "./parser";

let deviceManager: DeviceManager // Device Manager
let DSM: any = {} // Double State Manager

let doorWindowSensor0: DoorWindowSensor
let doorWindowSensor1: DoorWindowSensor
let light2: Light
let light3: Light

window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new DeviceManager(deviceArr)
    // Load devices sdk
    doorWindowSensor0 = deviceManager.getDoorWindowSensor('DoorAndWindowSensor_0')
    doorWindowSensor1 = deviceManager.getDoorWindowSensor('DoorAndWindowSensor_1')
    light2 = deviceManager.getLight('Lamp(Home)_2')
    light3 = deviceManager.getLight('Lamp(Home)_3')
    DSM.doorWindowSensor0 = {
      status: new Property('doorWindowSensor0', 'status'),
    }
    DSM.doorWindowSensor1 = {
      status: new Property('doorWindowSensor1', 'status'),
    }
    DSM.light2 = {
      onOff: new Property('light2', 'onOff'),
    }
    DSM.light3 = {
      onOff: new Property('light3', 'onOff'),
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
  DSM.light2.onOff.update = v => light2.setOnOff(Parser.parseToRemote(v))
  DSM.light3.onOff.update = v => light3.setOnOff(Parser.parseToRemote(v))
  // Init properties
  DSM.doorWindowSensor0.status.setRemoteValue((await doorWindowSensor0.getStatus()).value)
  DSM.doorWindowSensor1.status.setRemoteValue((await doorWindowSensor1.getStatus()).value)
  DSM.light2.onOff.setRemoteValue((await light2.getOnOff()).value)
  DSM.light3.onOff.setRemoteValue((await light3.getOnOff()).value)
  // Init remote receive
  doorWindowSensor0.onReceive(data => {
    data.status = Parser.parseFromRemote(data.status)
    DSM.doorWindowSensor0.status.setRemoteValue(data.status)
  })
  doorWindowSensor1.onReceive(data => {
    data.status = Parser.parseFromRemote(data.status)
    DSM.doorWindowSensor1.status.setRemoteValue(data.status)
  })
  light2.onReceive(data => {
    data.onOff = Parser.parseFromRemote(data.onOff)
    DSM.light2.onOff.setRemoteValue(data.onOff)
  })
  light3.onReceive(data => {
    data.onOff = Parser.parseFromRemote(data.onOff)
    DSM.light3.onOff.setRemoteValue(data.onOff)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  DSM.doorWindowSensor0.status.addListener(value => {
    DSM.light2.onOff.setLocalValue(value, From.Local)
  })
  DSM.doorWindowSensor1.status.addListener(value => {
    DSM.light3.onOff.setLocalValue(value, From.Local)
  })
}

