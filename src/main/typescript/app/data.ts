
export const data = {
  "name": "测试项目",
  "devices": [
    {
      "id": "N1",
      "ports": [
        {
          "id": "1-IN-1",
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "switch"
        },
        {
          "id": "1-OUT-1",
          "name": "开关",
          "left": false,
          "disable": true,
          "property": "switch"
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
          "id": "3-IN-1",
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "switch"
        }
      ],
      "disable": false,
      "name": "HouseholdHumidifier",
      "vn": "homeHumidifier2",
      "index": 2,
      "tal": "HomeHumidifier",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "a171051c-c32c-44d4-843b-9956058c2aca",
      "source": {
        "cell": "N1",
        "port": "N3",
        "device": "light0",
        "property": "switch"
      },
      "target": {
        "cell": "1-OUT-1",
        "port": "3-IN-1",
        "device": "homeHumidifier2",
        "property": "switch"
      },
      "disable": false
    }
  ],
  "logics": [],
  "properties": [
    {
      "device": "Light",
      "name": "开关",
      "tal": "switch",
      "permission": "rwn",
      "talType": "ANY",
      "range": [],
      "options": [],
      "getFunctionName": "getSwitch",
      "setFunctionName": "setSwitch"
    },
    {
      "device": "HomeHumidifier",
      "name": "开关",
      "tal": "switch",
      "permission": "rwn",
      "talType": "ANY",
      "range": [],
      "options": [],
      "getFunctionName": "getSwitch",
      "setFunctionName": "setSwitch"
    }
  ],
  "counter": 3
}
