
export const data = {
  "name": "test",
  "devices": [
    {
      "id": "N1",
      "ports": [
        {
          "id": "1-OUT-1",
          "name": "门窗状态",
          "left": false,
          "disable": true,
          "property": "status"
        }
      ],
      "disable": false,
      "name": "DoorAndWindowSensor",
      "vn": "doorWindowSensor0",
      "index": 0,
      "tal": "DoorWindowSensor",
      "model": ""
    },
    {
      "id": "N2",
      "ports": [
        {
          "id": "2-IN-1",
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "onOff"
        }
      ],
      "disable": false,
      "name": "Lamp(Home)",
      "vn": "light1",
      "index": 1,
      "tal": "Light",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "fff296fa-426b-4d82-9e30-16995fb51b25",
      "source": {
        "cell": "N1",
        "port": "N2",
        "device": "doorWindowSensor0",
        "property": "status"
      },
      "target": {
        "cell": "1-OUT-1",
        "port": "2-IN-1",
        "device": "light1",
        "property": "onOff"
      },
      "disable": false
    }
  ],
  "logics": [],
  "properties": [
    {
      "device": "DoorWindowSensor",
      "name": "门窗状态",
      "tal": "status",
      "permission": "rn",
      "talType": "ANY",
      "range": [],
      "options": [],
      "getFunctionName": "getStatus",
      "setFunctionName": "setStatus"
    },
    {
      "device": "Light",
      "name": "开关",
      "tal": "onOff",
      "permission": "rwn",
      "talType": "ANY",
      "range": [],
      "options": [],
      "getFunctionName": "getSwitch",
      "setFunctionName": "setSwitch"
    }
  ],
  "counter": 2
}
