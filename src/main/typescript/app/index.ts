import Property, {From} from "./core/property";
import NormalParser from "./core/parser/normal-parser";
import DpParser from "./core/parser/dp-parser";
import {PDO, PDS, Queue} from "./core/utils";

let DSM: any = {} // Double State Manager

const humanBodySensor0 = DeviceManager.createHumanBodySensor('HumanMotionSensor_0')
const light1 = DeviceManager.createLight('Lamp(Home)_1')
const homeHumidifier2 = DeviceManager.createHomeHumidifier('HouseholdHumidifier_2')
const doorAndWindowSensor3 = DeviceManager.createDoorAndWindowSensor('DoorAndWindowSensor_3')

init().then(r => {
  console.log('Init Success.')
  main().then(r => {
    console.log('Running...')
  }, e => {
    console.error('Main Failed.')
    console.error(e)
  })
}, e => {
  console.error('Init Failed.')
  console.error(e)
})

// Init function
async function init(): Promise<void> {
  // Init DSM states
  DSM.humanBodySensor0 = {
    existStatus: new Property('humanBodySensor0', 'existStatus'),
  }
  DSM.light1 = {
    switch: new Property('light1', 'switch'),
  }
  DSM.homeHumidifier2 = {
    settledHumidity: new Property('homeHumidifier2', 'settledHumidity'),
  }
  DSM.doorAndWindowSensor3 = {
    status: new Property('doorAndWindowSensor3', 'status'),
  }
  
  // Init set function
  DSM.light1.switch.update = v => light1.setSwitch(NormalParser.to(v))
  DSM.homeHumidifier2.settledHumidity.update = v => homeHumidifier2.setHumidity(NormalParser.to(v))
  
  // Init properties
  DSM.humanBodySensor0.existStatus.setRemoteValue((await humanBodySensor0.getExistStatus()).value)
  DSM.light1.switch.setRemoteValue((await light1.getSwitch()).value)
  DSM.homeHumidifier2.settledHumidity.setRemoteValue((await homeHumidifier2.getSettledHumidity()).value)
  DSM.doorAndWindowSensor3.status.setRemoteValue((await doorAndWindowSensor3.getStatus()).value)
  
  // Init remote receive
  humanBodySensor0.subscribe(data => {
    data.existStatus = NormalParser.from(data.existStatus)
    DSM.humanBodySensor0.existStatus.setRemoteValue(data.existStatus)
  })
  light1.subscribe(data => {
    data.switch = NormalParser.from(data.switch)
    DSM.light1.switch.setRemoteValue(data.switch)
  })
  homeHumidifier2.subscribe(data => {
    data.settledHumidity = NormalParser.from(data.settledHumidity)
    DSM.homeHumidifier2.settledHumidity.setRemoteValue(data.settledHumidity)
  })
  doorAndWindowSensor3.subscribe(data => {
    data.status = NormalParser.from(data.status)
    DSM.doorAndWindowSensor3.status.setRemoteValue(data.status)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  DSM.humanBodySensor0.existStatus.addListener(value => {
    value = new DpParser(DSM.humanBodySensor0.existStatus, DSM.light1.switch).parse(value)
    DSM.light1.switch.setLocalValue(value, From.Local)
  })

  // Logic code
  setTimeout(async () => {
    if(PDS('BOOLEAN', 'A1', 0)){
      PDO('CONTROL_ROTATION', 'B1', 0)
    }
  }, 0)
  
  DSM..addListener(async v => {
    if(PDS('BOOLEAN_HAD', 'A1', 0)){
      PDO('ROTATION_VALUE', 'B1', 0, 0)
      PDO('ROTATION_TURNS_NUMBER', 'B1', 0, 0)
    }
  })
  
  DSM..addListener(async v => {
    if (!v) {
      DSM.light1.switch.setRemoteValue(true)
    }
  })
  
  DSM..addListener(async v => {
    if (!v) {
      if(PDS('COMPARE', 'A1', 0, 10)){
      
      }
    }
  })
  
}

