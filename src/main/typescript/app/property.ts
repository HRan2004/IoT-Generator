
export default class Property {
  value: any
  
  setValue(value: any): boolean {
    if (this.value === value) {
      return false
    }
    this.value = value
    return true
  }
}
