
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
          "id": "2-OUT-1",
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
    },
    {
      "id": "N4",
      "ports": [
        {
          "id": "4-IN-1",
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "onOff"
        }
      ],
      "disable": false,
      "name": "Lamp(Home)",
      "vn": "light3",
      "index": 3,
      "tal": "Light",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "635c5443-f4f3-49bc-92bf-b83b1fac48a0",
      "source": {
        "cell": "N1",
        "port": "N3",
        "device": "doorWindowSensor0",
        "property": "status"
      },
      "target": {
        "cell": "1-OUT-1",
        "port": "3-IN-1",
        "device": "light2",
        "property": "onOff"
      },
      "disable": false
    },
    {
      "id": "0d977c63-eff4-4c29-a6ce-d39ced84f6cb",
      "source": {
        "cell": "N2",
        "port": "N4",
        "device": "doorWindowSensor1",
        "property": "status"
      },
      "target": {
        "cell": "2-OUT-1",
        "port": "4-IN-1",
        "device": "light3",
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
      "getFunctionName": "getOnOff",
      "setFunctionName": "setOnOff"
    }
  ],
  "counter": 4
}
