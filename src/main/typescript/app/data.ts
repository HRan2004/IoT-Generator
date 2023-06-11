
export const data = {
  "name": "test",
  "devices": [
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
      "vn": "light0",
      "index": 0,
      "tal": "Light",
      "model": ""
    },
    {
      "id": "N3",
      "ports": [
        {
          "id": "3-OUT-1",
          "name": "门窗状态",
          "left": false,
          "disable": true,
          "property": "status"
        }
      ],
      "disable": false,
      "name": "DoorAndWindowSensor",
      "vn": "doorWindowSensor1",
      "index": 1,
      "tal": "DoorWindowSensor",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "5e4b61b3-b33a-4454-a2a1-f14ab39a9576",
      "source": {
        "cell": "N3",
        "port": "N2",
        "device": "doorWindowSensor1",
        "property": "status"
      },
      "target": {
        "cell": "3-OUT-1",
        "port": "2-IN-1",
        "device": "light0",
        "property": "onOff"
      },
      "disable": false
    }
  ],
  "logics": [],
  "properties": [
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
    }
  ],
  "counter": 2
}
