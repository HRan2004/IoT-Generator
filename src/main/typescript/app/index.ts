import Property, {From} from "./core/property";
import NormalParser from "./core/parser/normal-parser";
import DpParser from "./core/parser/dp-parser";
import {PDO, PDS, Queue} from "./core/utils";

let DSM: any = {} // Double State Manager

const light0 = DeviceManager.createLight('Lamp(Home)_0')

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
  DSM.light0 = {
    switch: new Property('light0', 'switch'),
  }
  // Init set function
  DSM.light0.switch.update = v => light0.setSwitch(NormalParser.to(v))
  // Init properties
  DSM.light0.switch.setRemoteValue((await light0.getSwitch()).value)
  // Init remote receive
  light0.subscribe(data => {
    data.switch = NormalParser.from(data.switch)
    DSM.light0.switch.setRemoteValue(data.switch)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  

  // Logic code
  setTimeout(async () => {
    for(let i=0;i<3;i++){
      DSM.light0.switch.setRemoteValue(true)
      await Queue.delay(1 * 1000)
      DSM.light0.switch.setRemoteValue(false)
      await Queue.delay(1 * 1000)
    }
  }, 0)
  
}

