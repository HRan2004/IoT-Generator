
export default class TalType {
  type: DataType = DataType.ANY
  range: number[] = []
  options: string[] = []
  
  // Example  int:0,100,1  string:OPEN,CLOSE  boolean  any
  constructor(ct: String) {
    let args = ct.trim().split(':')
    this.type = DataType.make(args[0])
    if (args.length > 1) {
      let arg = args[1]
      if (this.isNumber()) {
        let range = arg.trim().split(',')
        if (range.length >= 2) {
          let step = range.length >= 3 ? parseFloat(range[2]) : 1
          this.range = [parseFloat(range[0]), parseFloat(range[1]), step]
        }
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
  
  toCtText(): string {
    let text = this.type.toString()
    if (this.isNumber() && this.hadRange()) {
      text += `:${this.range[0]},${this.range[1]}`
      if (this.range[2] !== 1) text += `,${this.range[2]}`
    } else if (this.type === DataType.STRING && this.hadOptions()) {
      text += `:${this.options.join(',')}`
    }
    return text
  }
}

export class DataType {
  static make(text: String): DataType {
    switch (text.toLowerCase()) {
      case 'int':
        return DataType.INT
      case 'float':
        return DataType.FLOAT
      case 'boolean':
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
  
  static INT = 'INT'
  static FLOAT = 'FLOAT'
  static BOOLEAN = 'BOOLEAN'
  static STRING = 'STRING'
  static OBJECT = 'OBJECT'
  static ANY = 'ANY'
  static NONE = 'NONE'
}
