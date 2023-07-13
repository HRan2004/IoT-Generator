import {UNKNOWN} from "./const";

export default class Property {
  device: string
  key: string
  
  localValue: any = UNKNOWN
  remoteValue: any = UNKNOWN
  update: ((value: any) => TalPromise) | null // Direct upload value to device
  
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
    this.localValue = value
    this.listeners.forEach(l => l(value))
    if (this.remoteValue !== value) {
      this.setRemoteValue(value, From.Local)
    }
    return true
  }
  
  setRemoteValue(value: any, from: From = From.Device): boolean {
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
      console.log('')
      console.log(`Receive data: ${this.device}.${this.key} =`, value)
      this.setLocalValue(value, From.Remote)
    }
    return true
  }
  
}

export enum From {
  Local, // 本地属性值更新
  Remote, // 远程(本地变量中)属性值更新
  Page, // 页面属性值更新(用户操作)
  Device, // 设备属性值更新
}
