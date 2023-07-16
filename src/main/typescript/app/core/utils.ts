
export class Queue {
  static async delay(time: number): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
}

export async function PDO(command: string, ...args) {
  return null
}

export async function PDS(command: string, ...args) {
  return null
}

export function HaveNotSupport(...args) {
  return null
}

