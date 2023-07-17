import Property, {From} from "./core/property";
import LogicProperty from "./core/logic-property";
import NormalParser from "./core/parser/normal-parser";
import DpParser from "./core/parser/g-parser";
import {PDO, PDS, Queue, HaveNotSupport, mlog} from "./core/utils";

let DSM: any = {} // Double State Manager
export let inited = false

const light0 = DeviceManager.createLight('Lamp(Home)_0')
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
  DSM.light0 = {
    colorTemperature: new Property('light0', 'colorTemperature'),
  }
  DSM.light1 = {
    colorTemperature: new Property('light1', 'colorTemperature'),
  }

  // Init DSM Logic states
  DSM.logic0 = {
    B1: new LogicProperty('logic0', 'B1'),
  }
  DSM.logic1 = {
    B1: new LogicProperty('logic1', 'B1'),
  }

  // Init set function
  DSM.light0.colorTemperature.update = v => light0.setColorTemperature(NormalParser.to(v))
  DSM.light1.colorTemperature.update = v => light1.setColorTemperature(NormalParser.to(v))

  // Init properties
  DSM.light0.colorTemperature.setRemoteValue((await light0.getColorTemperature()).value)
  DSM.light1.colorTemperature.setRemoteValue((await light1.getColorTemperature()).value)

  // Init remote receive
  light0.subscribe(data => {
    data.colorTemperature = NormalParser.from(data.colorTemperature)
    DSM.light0.colorTemperature.setRemoteValue(data.colorTemperature)
  })
  light1.subscribe(data => {
    data.colorTemperature = NormalParser.from(data.colorTemperature)
    DSM.light1.colorTemperature.setRemoteValue(data.colorTemperature)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  

  // Logic code
  DSM.light0.colorTemperature.addListener(async v => {
    mlog(' ├ @EVENT CHANGE light0.colorTemperature changed-to', v)
    mlog(' ├ @EQUIP-PDO SET_VALUE logic0.B1 set as number')
    DSM.logic0.B1.setValue(
      mlog(' ├ @EQUIP-PDS VALUE light0.colorTemperature as number')
      || DSM.light0.colorTemperature.getLocalValue()
    )
  })
  
  DSM.logic0.B1.addListener(async v => {
    mlog(' ├ @EVENT CHANGE logic0.B1 changed-to', v)
    mlog(' ├ @EQUIP-PDO SET_VALUE logic1.B1 set as number')
    DSM.logic1.B1.setValue(
      mlog(' ├ @EQUIP-PDS VALUE logic0.B1 as number')
      || DSM.logic0.B1.getValue()
    )
  })
  
  DSM.logic1.B1.addListener(async v => {
    mlog(' ├ @EVENT CHANGE logic1.B1 changed-to', v)
    mlog(' ├ @EQUIP-PDO SET_VALUE light1.colorTemperature set as number')
    DSM.light1.colorTemperature.setLocalValue(
      mlog(' ├ @EQUIP-PDS VALUE logic1.B1 as number')
      || DSM.logic1.B1.getValue()
    )
  })
}

