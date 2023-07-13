const humanSensor = DeviceManager.createHumanBodySensor("人体传感器");
const desktopFan = DeviceManager.createDesktopFan("桌面扇");
const temperatureHumiditysSensor = DeviceManager.createTemperatureAndHumiditysSensor("温湿度传感器");

humanSensor.subscribe(humanSensorRes => {
  // 如果感应到有人
  if (humanSensorRes.data.existStatus === true) {
    // 打开桌面扇
    desktopFan.setSwitch(true);
    // 异步获取温度传感器温度
    temperatureHumiditysSensor.getTemperture().then((tempSensorRes) => {
      let temperature = tempSensorRes.data.temperature;
      if (temperature > 30) {
          // 设定风扇档位为高
          desktopFan.setGear("HIGH");
      } else if (temperature > 25) {  // 温度大于25但小于30
          desktopFan.setGear("Middle");
      } else {
          desktopFan.setGear("LOW");
      }
    });
  } else {
    // 如果上报没有感应到有人，关闭桌面扇
    desktopFan.setSwitch(false);
  }
})