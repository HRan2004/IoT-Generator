const smartSpeaker = DeviceManager.createSmartSpeaker("智能音箱")
const singleSmartCurtain = DeviceManager.createOnewayDrawCurtain("单开窗帘")
const doorWindowSensor = DeviceManager.createDoorAndWindowSensor("门窗传感器1")
const doorWindowSensor2 = DeviceManager.createDoorAndWindowSensor("门窗传感器2")
const standFan = DeviceManager.createStandFan("落地扇")
const temperatureAndHumiditySensor = DeviceManager.createTemperatureAndHumiditySensor("温湿度传感器")
const aromatherapyMachine = DeviceManager.createAromatherapyMachine("香薰机")
const healthPot = DeviceManager.createHealthPot("养生壶")

const DEBUG_MODE = true

let step = 0
main()

function registerTimeEveryDay(time, callback) {
  if (DEBUG_MODE) {
    callback()
    return
  }
  let timer = setInterval(() => {
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    if (hour === time.hour && minute === time.minute && second === time.second) {
      callback()
      // clearInterval(timer)
    }
  }, 1000)
}

function main() {
  const onClockTime = async () => {
    console.log('Clock Time')
    if (step !== 0) return
    step = 1
    try {
      await aromatherapyMachine.setSwitch(true)
      await smartSpeaker.setPlayControl(true)
      await aromatherapyMachine.setSprayVolumePercentage(60)
      await healthPot.setStart()
      return true
    } catch (e) {
      console.warn(e)
      return false
    }
  }
  registerTimeEveryDay({hour: 7, minute: 36, second: 0}, onClockTime)

  const onFirstDoorOpen = async () => {
    console.log('Bedroom Door Open')
    await singleSmartCurtain.setSwitch("OPEN")
    await aromatherapyMachine.setOnOff(false)
    let temperature = await temperatureAndHumiditySensor.getTemperature()
    console.log('Temperature:', temperature)
    if (temperature.value > 26) {
      await standFan.setSwitch(true)
      await standFan.setWindSpeed(30)
      await standFan.setOscillatingSwitch(true)
      await standFan.setWorkMode("NATURE")
    }
  }
  const onSecondDoorOpen = async () => {
    console.log('Living Room Door Open')
    try {
      await smartSpeaker.setPlayControl(false)
      await healthPot.setStop()
      await standFan.setSwitch(false)
    } catch (e) {
      console.warn(e)
    }
    console.log('Scene End')
  }
  const check = async () => {
    if (step === 1) {
      let doorState = await doorWindowSensor.getStatus()
      if (doorState.value) {
        step = 2
        onFirstDoorOpen()
      }
    } else if (step === 2) {
      // TODO: 第二个设备没有方法 暂用第一个代替
      console.log(doorWindowSensor2)
      let doorState = await doorWindowSensor.getStatus()
      if (doorState.value) {
        step = 3
        clearInterval(timer)
        onSecondDoorOpen()
      }
    }
  }
  let timer = setInterval(() => {
    check()
  }, 2000)
}

