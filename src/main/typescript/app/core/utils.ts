
export async function sleep(time: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function PDO(command: string, ...args): any {
}

export function PDS(command: string, ...args): any {
}
