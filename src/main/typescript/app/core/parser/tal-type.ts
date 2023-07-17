
export default class TalType {
  type: DataType = DataType.ANY
  range: [number, number, number] = [-1, -1, 1]
  options: string[] = []
  
  // Example  int:0,100,1  string:OPEN,CLOSE  boolean  any
  constructor(ct: String) {
    let args = ct.split(':')
    this.type = DataType.make(args[0])
    if (args.length > 1) {
      let arg = args[1]
      if (this.isNumber()) {
        let range = arg.split(',')
        this.range = [parseFloat(range[0]), parseFloat(range[1]), parseFloat(range[2])]
      } else if (this.type === DataType.STRING) {
        this.options = arg.split(',')
      }
    }
  }
  
  isNumber(): boolean {
    return this.type === DataType.INT || this.type === DataType.FLOAT
  }
  
  hadRange(): boolean {
    return this.range[0] !== -1 && this.range[1] !== -1
  }
  
  isInRange(value: number): boolean {
    return value >= this.range[0] && value <= this.range[1]
  }
  
  hadOptions(): boolean {
    return this.options.length > 0
  }
  
  indexInOptions(value: string): number {
    return this.options.indexOf(value)
  }
}

export class DataType {
  static make(text: String): DataType {
    switch (text) {
      case 'int':
        return DataType.INT
      case 'float':
        return DataType.FLOAT
      case 'bool':
        return DataType.BOOLEAN
      case 'string':
        return DataType.STRING
      case 'object':
        return DataType.OBJECT
      case 'any':
        return DataType.ANY
      case 'none':
        return DataType.NONE
      default:
        return DataType.ANY
    }
  }
  
  static INT = 'int'
  static FLOAT = 'float'
  static BOOLEAN = 'bool'
  static STRING = 'string'
  static OBJECT = 'object'
  static ANY = 'any'
  static NONE = 'none'
}
