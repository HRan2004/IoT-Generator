let deviceManager
let humanSensor

(window as any).methods = {
  onloadSdk(deviceArr) {
    console.log('OnLoadSdk', 10)
    // @ts-ignore
    deviceManager = new DeviceManager(deviceArr)
    humanSensor = deviceManager.getHumanSensor_1('人体存在传感器')
    
    try {
      main()
    } catch (e) {
      console.error('Run Error')
      console.warn(e)
    }
  },
}

async function main(): Promise<void> {
  const printHumanExist = async (): Promise<void> => {
    try {
      let res = await humanSensor.getExistStatus()
      console.log(res.value)
    } catch (e) {
      console.warn(e)
    }
  }
  
  setInterval(() => {
    printHumanExist()
  }, 2 * 1000)
}


declare class TalResponse {
  value: any
}

declare class HumanSensor_1 {
  getExistStatus(): Promise<TalResponse>
}

declare class DeviceManager {
  constructor(deviceArr: any[])
  getHumanSensor_1(name: string): HumanSensor_1
}
