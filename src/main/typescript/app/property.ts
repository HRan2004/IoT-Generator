import {UNKNOWN} from "./const";

export default class Property {
  device: string
  key: string
  
  localValue: any = UNKNOWN
  remoteValue: any = UNKNOWN
  update: (value: any) => TalPromise
  
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
  
  setLocalValue(value: any, from: From = From.Local): boolean {
    this.localValue = value
    this.listeners.forEach(l => l(value))
    return true
  }
  setRemoteValue(value: any, from: From = From.Local): boolean {
    if (this.remoteValue === value) return false
    this.remoteValue = value
    return true
  }
  
}

export enum From {
  Local,
  Remote,
  Page,
  Device,
}
