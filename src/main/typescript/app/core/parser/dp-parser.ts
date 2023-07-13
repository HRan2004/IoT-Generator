import Property from "../property";

export default class DpParser {
  from: Property
  to: Property
  
  constructor(from: Property, to: Property) {
    this.from = from
    this.to = to
  }
  
  parse(value: any): any {
  
  }
}
