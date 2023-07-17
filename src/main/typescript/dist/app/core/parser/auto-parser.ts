import {DataType} from "./tal-type";

export default class AutoParser {
  
  static convert(value: any, to: DataType = DataType.ANY): any {
    if ([DataType.ANY, DataType.OBJECT, DataType.NONE].includes(to.toString())) {
      return value
    } else if (value === null) {
      return null
    }
    if (to == DataType.STRING) {
      return value.toString()
    }
    if (typeof value == "string") {
      if (to == DataType.INT) {
        return Math.round(parseFloat(value))
      } else if (to == DataType.FLOAT) {
        return parseFloat(value)
      } else if (to == DataType.BOOLEAN) {
        return value == "true"
      }
    } else if (typeof value == "number") {
      if (to == DataType.INT) {
        return Math.round(value)
      } else if (to == DataType.FLOAT) {
        return value
      } else if (to == DataType.BOOLEAN) {
        return value > 0
      }
    } else if (typeof value == "boolean") {
      if (to == DataType.INT) {
        return value ? 1 : 0
      } else if (to == DataType.FLOAT) {
        return value ? 1.0 : 0.0
      }
    }
    return value
  }
  
}
