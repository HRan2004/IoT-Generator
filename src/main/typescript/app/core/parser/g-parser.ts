import Property from "../property";
import TalType from "./tal-type";

export default class GParser {
  from: TalType
  to: TalType
  
  constructor(from: TalType | string, to: TalType | string) {
    if (typeof from === "string") from = new TalType(from)
    if (typeof to === "string") to = new TalType(to)
    this.from = from
    this.to = to
  }
  
  convert(value: any): any {
    return value
  }
}
