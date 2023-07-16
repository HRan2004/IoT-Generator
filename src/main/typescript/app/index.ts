import Property, {From} from "./core/property";
import NormalParser from "./core/parser/normal-parser";
import DpParser from "./core/parser/dp-parser";
import {PDO, PDS, Queue, HaveNotSupport} from "./core/utils";

let DSM: any = {} // Double State Manager

const humanBodySensor3 = DeviceManager.createHumanBodySensor('HumanMotionSensor_3')
const light4 = DeviceManager.createLight('Lamp(Home)_4')

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
  DSM.humanBodySensor3 = {
    existStatus: new Property('humanBodySensor3', 'existStatus'),
  }
  DSM.light4 = {
    switch: new Property('light4', 'switch'),
  }

  // Init set function
  DSM.light4.switch.update = v => light4.setSwitch(NormalParser.to(v))

  // Init properties
  DSM.humanBodySensor3.existStatus.setRemoteValue((await humanBodySensor3.getExistStatus()).value)
  DSM.light4.switch.setRemoteValue((await light4.getSwitch()).value)

  // Init remote receive
  humanBodySensor3.subscribe(data => {
    data.existStatus = NormalParser.from(data.existStatus)
    DSM.humanBodySensor3.existStatus.setRemoteValue(data.existStatus)
  })
  light4.subscribe(data => {
    data.switch = NormalParser.from(data.switch)
    DSM.light4.switch.setRemoteValue(data.switch)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  

  // Logic code
  DSM.humanBodySensor3.existStatus.addListener(async v => {
    PDO('SET_VALUE', 'B1', 0, DSM.humanBodySensor3.existStatus.getLocalValue())
  })
  
  DSM.logic1.B1.addListener(async v => {
    DSM.light4.switch.setRemoteValue(DSM.logic1.B1.getLocalValue())
  })

  // L2L bind code
  
}

