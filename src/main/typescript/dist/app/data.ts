
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
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "switch"
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
      "id": "3baad6f9-f3b6-4cc1-8122-9980017cb434",
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
      "type": {
        "type": "BOOLEAN",
        "range": [],
        "options": []
      },
      "permission": "rwn",
      "getFunctionName": "getSwitch",
      "setFunctionName": "setSwitch"
    }
  ],
  "counter": 2,
  "logicCounter": 0
}
