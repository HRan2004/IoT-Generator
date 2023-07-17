
export const data = {
  "name": "test",
  "devices": [
    {
      "id": "N1",
      "ports": [
        {
          "id": "1-OUT-1",
          "name": "雾量档位",
          "left": false,
          "disable": true,
          "property": "sprayVolume"
        }
      ],
      "disable": false,
      "vn": "homeHumidifier0",
      "index": 0,
      "name": "HouseholdHumidifier",
      "tal": "HomeHumidifier",
      "model": ""
    },
    {
      "id": "N2",
      "ports": [
        {
          "id": "2-IN-1",
          "name": "光照强度",
          "left": true,
          "disable": true,
          "property": "relativeBrightness"
        },
        {
          "id": "2-IN-2",
          "name": "色温",
          "left": true,
          "disable": true,
          "property": "colorTemperature"
        }
      ],
      "disable": false,
      "vn": "light1",
      "index": 1,
      "name": "Lamp(Home)",
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
      "vn": "doorAndWindowSensor2",
      "index": 2,
      "name": "DoorAndWindowSensor",
      "tal": "DoorAndWindowSensor",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "cdf2f06b-ebe1-4f8e-b75d-c0ba180485e8",
      "source": {
        "cell": "N1",
        "port": "1-OUT-1",
        "device": "homeHumidifier0",
        "property": "sprayVolume"
      },
      "target": {
        "cell": "N2",
        "port": "2-IN-1",
        "device": "light1",
        "property": "relativeBrightness"
      },
      "disable": false
    },
    {
      "id": "89239893-dbb6-45a2-aca1-324141eba6af",
      "source": {
        "cell": "N3",
        "port": "3-OUT-1",
        "device": "doorAndWindowSensor2",
        "property": "status"
      },
      "target": {
        "cell": "N2",
        "port": "2-IN-2",
        "device": "light1",
        "property": "colorTemperature"
      },
      "disable": false
    }
  ],
  "logics": [],
  "properties": [
    {
      "device": "HomeHumidifier",
      "name": "雾量档位",
      "tal": "sprayVolume",
      "type": {
        "type": "STRING",
        "range": [],
        "options": [
          "SMALL",
          "MIDDLE",
          "LARGE"
        ]
      },
      "permission": "rwn",
      "getFunctionName": "getSprayVolume",
      "setFunctionName": "setSprayVolume"
    },
    {
      "device": "Light",
      "name": "光照强度",
      "tal": "relativeBrightness",
      "type": {
        "type": "INT",
        "range": [
          0.0,
          100.0,
          1.0
        ],
        "options": []
      },
      "permission": "rwn",
      "getFunctionName": "getRelativeBrightness",
      "setFunctionName": "setRelativeBrightness"
    },
    {
      "device": "Light",
      "name": "色温",
      "tal": "colorTemperature",
      "type": {
        "type": "INT",
        "range": [
          1700.0,
          7000.0,
          1.0
        ],
        "options": []
      },
      "permission": "rwn",
      "getFunctionName": "getColorTemperature",
      "setFunctionName": "setColorTemperature"
    },
    {
      "device": "DoorAndWindowSensor",
      "name": "门窗状态",
      "tal": "status",
      "type": {
        "type": "BOOLEAN",
        "range": [],
        "options": []
      },
      "permission": "rn",
      "getFunctionName": "getStatus",
      "setFunctionName": "setStatus"
    }
  ],
  "counter": 3,
  "logicCounter": 0
}
