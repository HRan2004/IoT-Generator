import Property from "../property";

export default class GParser {
  from: Property
  to: Property
  
  constructor(from: Property, to: Property) {
    this.from = from
    this.to = to
  }
  
  convert(value: any): any {
    return value
  }
}
