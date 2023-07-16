
export class Queue {
  static async delay(time: number): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
}

export function PDO(command: string, ...args) {
  return null
}

export function PDS(command: string, ...args) {
  return null
}

export function HaveNotSupport(...args) {
  return null
}

