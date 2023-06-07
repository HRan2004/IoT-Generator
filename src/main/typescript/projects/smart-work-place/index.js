var deviceManager;

let humanSensor;
let temperatureHumiditysSensor;
let householdHumidifier;

window.methods = {
  onloadSdk(deviceArr) {
    console.log('onloadSdk', 3)
    deviceManager = new DeviceManager(deviceArr)
    humanSensor = deviceManager.getHumanSensor_1('人体存在传感器')
    temperatureHumiditysSensor = deviceManager.getTemperatureHumiditysSensor('温湿度传感器')
    householdHumidifier = deviceManager.getHouseholdHumidifier('家用加湿器')

    try {
      main()
    } catch (e) {
      console.error('Run Error')
      console.warn(e)
    }
  },
}

async function main() {
  let state = false
  let mode = ''

  const setMode = async (value) => {
    console.log('SetHumidifierMode:', value)
    if (value === 'OFF') {
      if (!state) return
      state = false
      await householdHumidifier.setOnOff(false)
    } else {
      if (state) return
      state = true
      await householdHumidifier.setOnOff(true)
      if (value === mode) return
      mode = value
      await householdHumidifier.setSprayVolume(mode)
    }
  }

  const check = async () => {
    let res = await humanSensor.getExistStatus()
    console.log('ExistStatus:', res)
    let existStatus = res.value === 'OCCUPIED'
    if (existStatus) {
      let res = await temperatureHumiditysSensor.getHumidity()
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
  }, 120 * 1000)
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

