
export class Trigger {
  
  static interval(func: Function, time: number, times: number = -1) {
    let interval = setInterval(() => {
      if (times === 0) {
        clearInterval(interval)
      } else {
        func()
        if (times !== -1) times--
      }
    }, time)
  }
  
}

export default class Manager {
  static Trigger = Trigger
}
