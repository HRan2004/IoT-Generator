import Property, {From} from "./core/property";
import LogicProperty from "./core/logic-property";
import NormalParser from "./core/parser/normal-parser";
import DpParser from "./core/parser/g-parser";
import {PDO, PDS, Queue, HaveNotSupport, mlog} from "./core/utils";

let DSM: any = {} // Double State Manager
export let inited = false

const homeHumidifier0 = DeviceManager.createHomeHumidifier('HouseholdHumidifier_0')
const light1 = DeviceManager.createLight('Lamp(Home)_1')
const doorAndWindowSensor2 = DeviceManager.createDoorAndWindowSensor('DoorAndWindowSensor_2')

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
  DSM.homeHumidifier0 = {
    sprayVolume: new Property('homeHumidifier0', 'sprayVolume'),
  }
  DSM.light1 = {
    relativeBrightness: new Property('light1', 'relativeBrightness'),
    colorTemperature: new Property('light1', 'colorTemperature'),
  }
  DSM.doorAndWindowSensor2 = {
    status: new Property('doorAndWindowSensor2', 'status'),
  }

  // Init DSM Logic states
  

  // Init set function
  DSM.homeHumidifier0.sprayVolume.update = v => homeHumidifier0.setSprayVolume(NormalParser.to(v))
  DSM.light1.relativeBrightness.update = v => light1.setRelativeBrightness(NormalParser.to(v))
  DSM.light1.colorTemperature.update = v => light1.setColorTemperature(NormalParser.to(v))

  // Init properties
  DSM.homeHumidifier0.sprayVolume.setRemoteValue((await homeHumidifier0.getSprayVolume()).value)
  DSM.light1.relativeBrightness.setRemoteValue((await light1.getRelativeBrightness()).value)
  DSM.light1.colorTemperature.setRemoteValue((await light1.getColorTemperature()).value)
  DSM.doorAndWindowSensor2.status.setRemoteValue((await doorAndWindowSensor2.getStatus()).value)

  // Init remote receive
  homeHumidifier0.subscribe(data => {
    data.sprayVolume = NormalParser.from(data.sprayVolume)
    DSM.homeHumidifier0.sprayVolume.setRemoteValue(data.sprayVolume)
  })
  light1.subscribe(data => {
    data.relativeBrightness = NormalParser.from(data.relativeBrightness)
    DSM.light1.relativeBrightness.setRemoteValue(data.relativeBrightness)
  })
  light1.subscribe(data => {
    data.colorTemperature = NormalParser.from(data.colorTemperature)
    DSM.light1.colorTemperature.setRemoteValue(data.colorTemperature)
  })
  doorAndWindowSensor2.subscribe(data => {
    data.status = NormalParser.from(data.status)
    DSM.doorAndWindowSensor2.status.setRemoteValue(data.status)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  DSM.homeHumidifier0.sprayVolume.addListener(value => {
    value = new DpParser(DSM.homeHumidifier0.sprayVolume, DSM.light1.relativeBrightness).convert(value)
    mlog(' ├ @BIND light1.relativeBrightness changed-to', value)
    DSM.light1.relativeBrightness.setLocalValue(value, From.Local)
  })
  DSM.doorAndWindowSensor2.status.addListener(value => {
    value = new DpParser(DSM.doorAndWindowSensor2.status, DSM.light1.colorTemperature).convert(value)
    mlog(' ├ @BIND light1.colorTemperature changed-to', value)
    DSM.light1.colorTemperature.setLocalValue(value, From.Local)
  })

  // Logic code
  
}

