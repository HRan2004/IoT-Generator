import Property, {From} from "./property";
import Parser from "./parser";

let deviceManager: DeviceManager // Device Manager
let DSM: any = {} // Double State Manager

let light0: Light
let doorWindowSensor1: DoorWindowSensor

window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new DeviceManager(deviceArr)
    // Load devices sdk
    light0 = deviceManager.getLight('Lamp(Home)_01')
    doorWindowSensor1 = deviceManager.getDoorWindowSensor('DoorAndWindowSensor_1')
  }
}

