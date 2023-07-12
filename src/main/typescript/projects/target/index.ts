import Property, {From} from "./core/property";
import Parser from "./core/parser";
const DeviceManager: any = {}

let DSM: any = {} // Double State Manager

const light0 = DeviceManager.createLight('Lamp(Home)_0')
const homeHumidifier2 = DeviceManager.createHomeHumidifier('HouseholdHumidifier_2')

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

// Init function
async function init(): Promise<void> {
  // Init DSM states
  DSM.light0 = {
    onOff: new Property('light0', 'onOff'),
  }
  DSM.householdHumidifier2 = {
    onOff: new Property('householdHumidifier2', 'onOff'),
  }
  // Init set function
  DSM.light0.onOff.update = v => light0.setSwitch(Parser.parseToRemote(v))
  DSM.householdHumidifier2.onOff.update = v => homeHumidifier2.setSwitch(Parser.parseToRemote(v))
  // Init properties
  DSM.light0.onOff.setRemoteValue((await light0.getSwitch()).value)
  DSM.householdHumidifier2.onOff.setRemoteValue((await homeHumidifier2.getSwitch()).value)
  // Init remote receive
  light0.subscribe(data => {
    data.onOff = Parser.parseFromRemote(data.onOff)
    DSM.light0.onOff.setRemoteValue(data.onOff)
  })
  homeHumidifier2.subscribe(data => {
    data.onOff = Parser.parseFromRemote(data.onOff)
    DSM.householdHumidifier2.onOff.setRemoteValue(data.onOff)
  })
}

// Main function
async function main(): Promise<void> {
  // Edges property bind
  DSM.light0.onOff.addListener(value => {
    DSM.householdHumidifier2.onOff.setLocalValue(value, From.Local)
  })
}

