import {From} from "./property";

export default class LogicProperty {
  device: string
  key: string
  
  value: any = null
  
  setValue(value: any) {
    if (this.value === value) {
      console.log("Logic value not changed")
      return false
    }
    this.value = value
    console.log(`Update logic state: ${this.device}.${this.key} =`, value)
    this.listeners.forEach(l => l(value))
    return true
  }
  
  getValue(): any {
    return this.value
  }
  
  constructor(device: string, key: string) {
    this.device = device
    this.key = key
  }
  
  listeners: Array<(value: any) => void> = []
  
  addListener(listener: (value: any) => void) {
    this.listeners.push(listener)
  }
  
  removeListener(listener: (value: any) => void) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }
  
  removeAllListeners() {
    this.listeners = []
  }
}
