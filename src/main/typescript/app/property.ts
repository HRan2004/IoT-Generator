import {UNKNOWN} from "./const";

export default class Property {
  
  key: string
  value: any = UNKNOWN
  remoteValue: any = UNKNOWN
  
  constructor(key: string) {
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
  
  setValue(value: any, from: From = From.Local): boolean {
    this.value = value
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
