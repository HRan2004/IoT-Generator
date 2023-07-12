
export const data = {
  "name": "test",
  "devices": [
    {
      "id": "N1",
      "ports": [
        {
          "id": "1-IN-1",
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "onOff"
        },
        {
          "id": "1-OUT-1",
          "name": "开关",
          "left": false,
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
          "id": "3-IN-1",
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "onOff"
        }
      ],
      "disable": false,
      "name": "HouseholdHumidifier",
      "vn": "householdHumidifier2",
      "index": 2,
      "tal": "HouseholdHumidifier",
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
        "property": "onOff"
      },
      "target": {
        "cell": "1-OUT-1",
        "port": "3-IN-1",
        "device": "householdHumidifier2",
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
      "device": "HouseholdHumidifier",
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
