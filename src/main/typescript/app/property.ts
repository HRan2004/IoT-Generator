import {UNKNOWN} from "./const";

export default class Property {
  device: string
  key: string
  changed: boolean = false
  
  localValue: any = UNKNOWN
  remoteValue: any = UNKNOWN
  update: ((value: any) => TalPromise) | null
  
  constructor(device: string, key: string, update: ((value: any) => TalPromise) | null = null) {
    this.device = device
    this.key = key
    this.update = update
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
  
  setLocalValue(value: any, from: From = From.Local): boolean {
    if (this.localValue === value) return false
    this.changed = true
    this.localValue = value
    this.listeners.forEach(l => l(value))
    if (this.remoteValue !== value) {
      this.setRemoteValue(value, From.Local)
    }
    return true
  }
  
  setRemoteValue(value: any, from: From = From.Local): boolean {
    if (this.remoteValue === value) return false
    this.remoteValue = value
    if (from === From.Local) {
      console.log(`Update remote: ${this.device}.${this.key} =`, value)
      this.update && this.update(value).then(r => {
        console.log(`Update ${this.device}.${this.key} success:`, r)
      }, e => {
        console.error(`Update ${this.device}.${this.key} error:`)
        console.error(e)
      })
    } else if (from === From.Device) {
      console.log(`Receive data: ${this.device}.${this.key} =`, value)
      this.setLocalValue(value, From.Remote)
    }
    return true
  }
  
}

export enum From {
  Local,
  Remote,
  Page,
  Device,
}
