var deviceManager;

let speaker;
let singleSmartCurtain;
let doorWindowSensor;
let desktopFan;
let temperatureHumiditysSensor;
let aromatherapyMachine;

window.methods = {
  onloadSdk(deviceArr) {
    console.log('onloadSdk')
    deviceManager = new DeviceManager(deviceArr)
    speaker = deviceManager.getSpeaker("智能音箱")
    singleSmartCurtain = deviceManager.getSingleSmartCurtain("智能窗帘")
    doorWindowSensor = deviceManager.getDoorWindowSensor("门窗传感器")
    desktopFan = deviceManager.getDesktopFan("台式风扇")
    temperatureHumiditysSensor = deviceManager.getTemperatureHumiditysSensor("温湿度传感器")
    aromatherapyMachine = deviceManager.getAromatherapyMachine("香薰机")

    main()
  },
}

function registerTimeEveryDay(time, callback) {
  let timer = setInterval(() => {
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    if (hour == time.hour && minute == time.minute && second == time.second) {
      callback()
      clearInterval(timer)
    }
  }, 1000)
}

function main() {
  const onClockTime = () => {
    console.log(new Date().getTime())
    speaker.playMusic("起床闹钟")
    aromatherapyMachine.setOnOff("True")
    aromatherapyMachine.setMode("香薰")
    aromatherapyMachine.setTiming("30")
  }
  registerTimeEveryDay({hour: 7, minute: 40, second: 0}, onClockTime)
}

