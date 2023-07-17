import Property, {From} from "./core/property";
import LogicProperty from "./core/logic-property";
import NormalParser from "./core/parser/normal-parser";
import DpParser from "./core/parser/g-parser";
import {PDO, PDS, Queue, HaveNotSupport, mlog} from "./core/utils";

let DSM: any = {} // Double State Manager
export let inited = false

const humanBodySensor0 = DeviceManager.createHumanBodySensor('HumanMotionSensor_0')
const light1 = DeviceManager.createLight('Lamp(Home)_1')

init().then(r => {
  console.log('Init Success.')
  inited = true
  main().then(r => {
    console.log('')
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

  // Init DSM Logic states
  DSM.logic1 = {
    B1: new LogicProperty('logic1', 'B1'),
  }

  // Init set function
  DSM.light1.switch.update = v => light1.setSwitch(NormalParser.to(v))

  // Init properties
  DSM.humanBodySensor0.existStatus.setRemoteValue((await humanBodySensor0.getExistStatus()).value)
  DSM.light1.switch.setRemoteValue((await light1.getSwitch()).value)

  // Init remote receive
  humanBodySensor0.subscribe(data => {
    data.existStatus = NormalParser.from(data.existStatus)
    DSM.humanBodySensor0.existStatus.setRemoteValue(data.existStatus)
  })
  light1.subscribe(data => {
    data.switch = NormalParser.from(data.switch)
    DSM.light1.switch.setRemoteValue(data.switch)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  

  // Logic code
  DSM.humanBodySensor0.existStatus.addListener(async v => {
    mlog(' ├ @EVENT CHANGE humanBodySensor0.existStatus changed-to', v)
    mlog(' ├ @EQUIP-PDO SET_VALUE logic1.B1 set as number')
    DSM.logic1.B1.setValue(
      mlog(' ├ @EQUIP-PDS VALUE humanBodySensor0.existStatus as number')
      || DSM.humanBodySensor0.existStatus.getLocalValue()
    )
  })
  
  DSM.logic1.B1.addListener(async v => {
    mlog(' ├ @EVENT CHANGE logic1.B1 changed-to', v)
    mlog(' ├ @EQUIP-PDO SET_VALUE light1.switch set as number')
    DSM.light1.switch.setLocalValue(
      mlog(' ├ @EQUIP-PDS VALUE logic1.B1 as number')
      || DSM.logic1.B1.getValue()
    )
  })
}

