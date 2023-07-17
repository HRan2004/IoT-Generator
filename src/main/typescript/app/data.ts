
export const data = {
  "name": "test",
  "devices": [
    {
      "id": "N1",
      "ports": [
        {
          "id": "1-OUT-1",
          "name": "开关",
          "left": false,
          "disable": true,
          "property": "switch"
        }
      ],
      "disable": false,
      "vn": "light0",
      "index": 0,
      "name": "Lamp(Home)",
      "tal": "Light",
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
        }
      ],
      "disable": false,
      "vn": "light1",
      "index": 1,
      "name": "Lamp(Home)",
      "tal": "Light",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "07883539-6992-486a-9dff-a836d0367f0e",
      "source": {
        "cell": "N1",
        "port": "1-OUT-1",
        "device": "light0",
        "property": "switch"
      },
      "target": {
        "cell": "N2",
        "port": "2-IN-1",
        "device": "light1",
        "property": "relativeBrightness"
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
      "type": {
        "type": "BOOLEAN",
        "range": [],
        "options": []
      },
      "permission": "rwn",
      "getFunctionName": "getSwitch",
      "setFunctionName": "setSwitch"
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
    }
  ],
  "counter": 2,
  "logicCounter": 0
}
