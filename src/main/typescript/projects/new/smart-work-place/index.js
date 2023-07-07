const humanBodySensor = DeviceManager.createHumanBodySensor('人体存在传感器')
const temperatureAndHumiditySensor = DeviceManager.createTemperatureAndHumiditySensor('温湿度传感器')
const homeHumidifier = DeviceManager.createHomeHumidifier('家用加湿器')


let state = false
let mode = ''

async function setMode(value) {
  console.log('SetHumidifierMode:', value)
  if (value === 'OFF') {
    // if (!state) return
    state = false
    await homeHumidifier.setOnOff(false)
  } else {
    // if (state) return
    state = true
    await homeHumidifier.setOnOff(true)
    // if (value === mode) return
    mode = value
    await homeHumidifier.setSprayVolume(mode)
  }
}

async function check() {
  let res = await humanBodySensor.getExistStatus()
  console.log('ExistStatus:', res)
  let existStatus = res.value === 'OCCUPIED'
  if (existStatus) {
    let res = await temperatureAndHumiditySensor.getHumidity()
    console.log('Humidity:', res)
    let humidity = res.value
    if (humidity > 60) {
      setMode('OFF')
    } else if (humidity > 50) {
      setMode('SMALL')
    } else if (humidity > 30) {
      setMode('MIDDLE')
    } else {
      setMode('LARGE')
    }
  } else {
    setMode('OFF')
  }
}

setInterval(() => {
  try {
    check()
  } catch (e) {
    console.warn(e)
  }
}, 2 * 1000)

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

