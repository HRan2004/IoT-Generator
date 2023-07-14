
export async function sleep(time: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export async function PDO(command: string, ...args) {
}

export async function PDS(command: string, ...args) {
}
