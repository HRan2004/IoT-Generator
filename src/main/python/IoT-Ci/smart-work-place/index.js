var deviceManager;

let humanSensor;
let temperatureHumiditysSensor;
let householdHumidifier;

window.methods = {
  onloadSdk(deviceArr) {
    console.log('onloadSdk')
    deviceManager = new DeviceManager(deviceArr)
    humanSensor = deviceManager.getHumanSensor_1('人体存在传感器')
    temperatureHumiditysSensor = deviceManager.getTemperatureHumiditysSensor('温湿度传感器')
    householdHumidifier = deviceManager.getHouseholdHumidifier('家用加湿器')
    main()
  },
}

async function main() {
  let state = false
  let mode = 0

  const setMode = async (value) => {
    console.log('SetHumidifierMode:', value)
    if (value === 0) {
      if (!state) return
      state = false
      mode = 0
      await householdHumidifier.setOnOff(false)
    } else {
      if (state) return
      state = true
      await householdHumidifier.setOnOff(true)
      if (value === mode) return
      mode = value
      await householdHumidifier.setSprayVolumePercentage(mode)
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
        setMode(0)
      } else if (humidity > 50) {
        setMode(33)
      } else if (humidity > 30) {
        setMode(67)
      } else {
        setMode(100)
      }
    } else {
      setMode(0)
    }
  }

  while (true) {
    try {
      await check()
      await sleep(120 * 1000)
    } catch (e) {
      console.error(e)
    }
  }
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

