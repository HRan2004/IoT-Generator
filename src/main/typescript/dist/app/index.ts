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
    switch: new Property('light0', 'switch'),
  }
  DSM.light1 = {
    switch: new Property('light1', 'switch'),
  }

  // Init DSM Logic states
  

  // Init set function
  DSM.light0.switch.update = v => light0.setSwitch(NormalParser.to(v))
  DSM.light1.switch.update = v => light1.setSwitch(NormalParser.to(v))

  // Init properties
  DSM.light0.switch.setRemoteValue((await light0.getSwitch()).value)
  DSM.light1.switch.setRemoteValue((await light1.getSwitch()).value)

  // Init remote receive
  light0.subscribe(data => {
    data.switch = NormalParser.from(data.switch)
    DSM.light0.switch.setRemoteValue(data.switch)
  })
  light1.subscribe(data => {
    data.switch = NormalParser.from(data.switch)
    DSM.light1.switch.setRemoteValue(data.switch)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  let parser0 = new DpParser('BOOLEAN', 'BOOLEAN')
  DSM.light0.switch.addListener(value => {
    value = parser0.convert(value)
    mlog(' ├ @BIND light1.switch changed-to', value)
    DSM.light1.switch.setLocalValue(value, From.Local)
  })

  // Logic code
  
}

