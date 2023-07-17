import Property from "../property";
import TalType, {DataType} from "./tal-type";
import {mlog} from "../utils";

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
    if (this.from.type === DataType.ANY || this.to.type == DataType.ANY) return value
    if (this.from.type === this.to.type) return value
    
    let sourceValue = value
    let batch = new DataBatch()
    batch.real = value
    batch.type = this.from.type.toString()
    
    if (this.from.isNumber()) {
      batch.int = Math.round(value)
      batch.float = parseFloat(value)
      batch.string = value.toString()
      if (this.from.hadRange()) {
        batch.boolean = value >= this.from.range[0] + this.from.range[2] / 2
        batch.percent = (value - this.from.range[0]) / (this.from.range[1] - this.from.range[0])
      }
    } else if (this.from.type === DataType.BOOLEAN) {
      batch.int = value ? 1 : 0
      batch.float = value ? 1.0 : 0.0
      batch.string = value ? "true" : "false"
      batch.boolean = value
      batch.percent = value ? 1.0 : 0.0
    } else if (this.from.type === DataType.STRING) {
      batch.string = value
      if (this.from.hadOptions()) {
        batch.int = this.from.indexInOptions(value)
        batch.float = this.from.indexInOptions(value)
        let len = this.from.options.length
        batch.boolean = batch.int >= len / 2
        batch.percent = batch.int / len
      } else {
        batch.int = Math.round(value)
        batch.float = parseFloat(value)
        batch.boolean = value === "true"
        batch.percent = value === "true" ? 1.0 : 0.0
      }
    } else {
      batch.string = value.toString()
      batch.float = parseFloat(value)
      if (isNaN(batch.float)) batch.float = 0.0
      batch.int = Math.round(batch.float)
      batch.boolean = value === "true"
      batch.percent = value === "true" ? 1.0 : 0.0
    }
    
    if (this.to.isNumber()) {
      if (this.to.hadRange()) {
        if (this.from.isNumber() && this.from.hadRange()) {
          value = this.to.range[0] + batch.percent * (this.to.range[1] - this.to.range[0])
        } else if (this.from.type === DataType.STRING && this.from.hadOptions()) {
          value = this.to.range[0] + batch.percent * this.to.range[2]
          value = this.to.options[Math.round(value)]
        } else if (this.from.isNumber()) {
          value = Math.min(this.to.range[1], Math.max(this.to.range[0], value))
        } else if (this.from.type === DataType.STRING) {
          if (!isNaN(batch.float)) {
            value = Math.min(this.to.range[1], Math.max(this.to.range[0], batch.float))
          } else {
            value = value.toString().length > 0 ? this.to.range[1] : this.to.range[0]
          }
        }
      } else {
        if (this.from.isNumber()) {
        } else if (this.from.type === DataType.STRING) {
          if (!isNaN(batch.float)) {
            value = Math.min(this.to.range[1], Math.max(this.to.range[0], batch.float))
          } else {
            value = value.toString().length > 0 ? this.to.range[1] : this.to.range[0]
          }
        } else if (this.from.type === DataType.BOOLEAN) {
          value = batch.int
        } else {
          value = batch.float
        }
      }
      if (this.to.type === DataType.INT) {
        value = Math.round(value)
      }
    } else if (this.to.type === DataType.BOOLEAN) {
      value = batch.boolean
    } else if (this.to.type === DataType.STRING) {
      if (this.to.hadOptions()) {
        let len = this.to.options.length
        value = this.to.options[Math.round(batch.percent * len)]
      } else {
        value = batch.string
      }
    }
    if (sourceValue !== value) {
      mlog(
        "GParser convert:", sourceValue, "->", value, "\n",
        batch + "\nTalType:",
        this.from.toCtText(), "->", this.to.toCtText()
      )
    }
    return value
  }
}

export class DataBatch {
  int = 0
  float = 0.0
  boolean = false
  string = ""
  percent = 0.0
  
  real = 0
  type = "int"
  unit = ""
  significance = ""
}
