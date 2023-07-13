
export default class NormalParser {
  static from(data: any): any {
    if (typeof data === 'string') {
      if (data.toLowerCase() === 'true') return true
      if (data.toLowerCase() === 'false') return false
      if (data === 'OCCUPIED') return true
      if (data === 'NO_MAN') return false
    }
    return data
  }
  
  static to(data: any): any {
    return data
  }
}
