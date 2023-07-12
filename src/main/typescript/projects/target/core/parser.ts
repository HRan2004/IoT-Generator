
export default class Parser {
  static parseFromRemote(data: any): any {
    if (typeof data === 'string') {
      if (data.toLowerCase() === 'true') return true
      if (data.toLowerCase() === 'false') return false
      if (data === 'OCCUPIED') return true
      if (data === 'NO_MAN') return false
    }
    return data
  }
  
  static parseToRemote(data: any): any {
    return data
  }
}
