import Property, {From} from "./core/property";
import NormalParser from "./core/parser/normal-parser";
import DpParser from "./core/parser/dp-parser";

let DSM: any = {} // Double State Manager

const light0 = DeviceManager.createLight('Lamp(Home)_0')
const homeHumidifier2 = DeviceManager.createHomeHumidifier('HouseholdHumidifier_2')

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
  DSM.homeHumidifier2 = {
    switch: new Property('homeHumidifier2', 'switch'),
  }
  // Init set function
  DSM.light0.switch.update = v => light0.setSwitch(NormalParser.to(v))
  DSM.homeHumidifier2.switch.update = v => homeHumidifier2.setSwitch(NormalParser.to(v))
  // Init properties
  DSM.light0.switch.setRemoteValue((await light0.getSwitch()).value)
  DSM.homeHumidifier2.switch.setRemoteValue((await homeHumidifier2.getSwitch()).value)
  // Init remote receive
  light0.subscribe(data => {
    data.switch = NormalParser.from(data.switch)
    DSM.light0.switch.setRemoteValue(data.switch)
  })
  homeHumidifier2.subscribe(data => {
    data.switch = NormalParser.from(data.switch)
    DSM.homeHumidifier2.switch.setRemoteValue(data.switch)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  DSM.light0.switch.addListener(value => {
    value = new DpParser(DSM.light0.switch, DSM.homeHumidifier2.switch).parse(value)
    DSM.homeHumidifier2.switch.setLocalValue(value, From.Local)
  })
}

