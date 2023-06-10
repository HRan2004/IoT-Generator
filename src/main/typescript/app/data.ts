
export const data = {
  "name": "test",
  "devices": [
    {
      "id": "N1",
      "ports": [
        {
          "id": "1-OUT-1",
          "name": "设备电量",
          "left": false,
          "disable": true,
          "property": "temperature"
        },
        {
          "id": "1-OUT-2",
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
    },
    {
      "id": "N3",
      "ports": [
        {
          "id": "3-IN-1",
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "onOff"
        }
      ],
      "disable": false,
      "name": "Lamp(Home)",
      "vn": "light2",
      "index": 2,
      "tal": "Light",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "c7ec5df2-a7fb-4f19-8e1b-b1162e8a05b6",
      "source": {
        "cell": "N1",
        "port": "N3",
        "device": "doorWindowSensor0",
        "property": "status"
      },
      "target": {
        "cell": "1-OUT-2",
        "port": "3-IN-1",
        "device": "light2",
        "property": "onOff"
      },
      "disable": false
    },
    {
      "id": "047cedb3-d087-4b15-92c2-1f640ca2b0bc",
      "source": {
        "cell": "N1",
        "port": "N2",
        "device": "doorWindowSensor0",
        "property": "temperature"
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
      "name": "设备电量",
      "tal": "temperature",
      "permission": "rn",
      "talType": "ANY",
      "range": [],
      "options": [],
      "getFunctionName": "getTemperature",
      "setFunctionName": "setTemperature"
    },
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
      "getFunctionName": "getOnOff",
      "setFunctionName": "setOnOff"
    }
  ],
  "counter": 3
}
