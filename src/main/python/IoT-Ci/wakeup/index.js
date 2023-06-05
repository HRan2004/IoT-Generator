var deviceManager;

let speaker;
let singleSmartCurtain;
let doorWindowSensor;
let doorWindowSensor2;
let floorFan;
let temperatureHumiditysSensor;
let aromatherapyMachine;
let healthPot;

const DEBUG_MODE = true

window.methods = {
  onloadSdk(deviceArr) {
    console.log('onloadSdk 6')
    deviceManager = new DeviceManager(deviceArr)
    speaker = deviceManager.getSpeaker("智能音箱")
    singleSmartCurtain = deviceManager.getSingleSmartCurtain("智能窗帘")
    doorWindowSensor = deviceManager.getDoorWindowSensor("门窗传感器")
    doorWindowSensor2 = deviceManager.getDoorWindowSensor("门窗传感器2")
    floorFan = deviceManager.getFloorFan("落地扇")
    temperatureHumiditysSensor = deviceManager.getTemperatureHumiditysSensor("温湿度传感器")
    aromatherapyMachine = deviceManager.getAromatherapyMachine("香薰机")
    healthPot = deviceManager.getHealthPot("养生壶")
    main()
  },
}

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

let step = 0

function main() {
  const onClockTime = async () => {
    console.log('Clock Time')
    if (step !== 0) return
    step = 1
    try {
      await aromatherapyMachine.setOnOff(true)
      await speaker.setPlayMode("PLAY")
      await aromatherapyMachine.setSprayVolume(10)
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
    let temperature = await temperatureHumiditysSensor.getTemperature()
    console.log('Temperature:', temperature)
    if (temperature.value > 26) {
      await floorFan.setOnOff(true)
      await floorFan.setWindSpeed(30)
      await floorFan.setHorizontalSweepingOnOff(true)
      await floorFan.setWorkMode("NATURAL")
    }
  }
  const onSecondDoorOpen = async () => {
    console.log('Living Room Door Open')
    try {
      await speaker.setPlayMode("STOP")
      await healthPot.setStop()
      await floorFan.setOnOff(false)
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

