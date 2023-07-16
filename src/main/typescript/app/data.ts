
export const data = {
  "name": "test",
  "devices": [
    {
      "id": "N4",
      "ports": [
        {
          "id": "4-OUT-1",
          "name": "是否有人",
          "left": false,
          "disable": true,
          "property": "existStatus"
        }
      ],
      "disable": false,
      "vn": "humanBodySensor3",
      "index": 3,
      "name": "HumanMotionSensor",
      "tal": "HumanBodySensor",
      "model": ""
    },
    {
      "id": "N5",
      "ports": [
        {
          "id": "5-IN-1",
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "switch"
        }
      ],
      "disable": false,
      "vn": "light4",
      "index": 4,
      "name": "Lamp(Home)",
      "tal": "Light",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "78c8784a-47bc-40c6-91ca-57e39c54ebfd",
      "source": {
        "cell": "N4",
        "port": "4-OUT-1",
        "device": "humanBodySensor3",
        "property": "existStatus"
      },
      "target": {
        "cell": "N2",
        "port": "2-IN-1",
        "device": "LOGIC",
        "property": ""
      },
      "disable": false
    },
    {
      "id": "0811716f-7be9-4c41-b02b-4756536420a6",
      "source": {
        "cell": "N2",
        "port": "2-OUT-1",
        "device": "LOGIC",
        "property": ""
      },
      "target": {
        "cell": "N3",
        "port": "3-IN-1",
        "device": "LOGIC",
        "property": ""
      },
      "disable": false
    },
    {
      "id": "52581d76-d76d-4357-a88f-48ad4996d43b",
      "source": {
        "cell": "N3",
        "port": "3-OUT-1",
        "device": "LOGIC",
        "property": ""
      },
      "target": {
        "cell": "N5",
        "port": "5-IN-1",
        "device": "light4",
        "property": "switch"
      },
      "disable": false
    }
  ],
  "logics": [
    {
      "id": "N1",
      "ports": [
        {
          "id": "1-IN-1",
          "name": "A1",
          "left": true,
          "disable": true,
          "property": ""
        },
        {
          "id": "1-OUT-1",
          "name": "B1",
          "left": false,
          "disable": true,
          "property": ""
        }
      ],
      "disable": false,
      "vn": "logic0",
      "index": 0,
      "events": [],
      "pdm": {},
      "states": []
    },
    {
      "id": "N2",
      "ports": [
        {
          "id": "2-IN-1",
          "name": "A1",
          "left": true,
          "disable": true,
          "property": ""
        },
        {
          "id": "2-OUT-1",
          "name": "B1",
          "left": false,
          "disable": true,
          "property": ""
        }
      ],
      "disable": false,
      "vn": "logic1",
      "index": 1,
      "events": [
        {
          "trigger": "CHANGE A1",
          "code": "PDO(\u0027SET_VALUE\u0027, \u0027B1\u0027, 0, PDS(\u0027VALUE\u0027, \u0027A1\u0027, 0))\n"
        }
      ],
      "pdm": {
        "A1": "humanBodySensor3.existStatus"
      },
      "states": [
        "B1"
      ]
    },
    {
      "id": "N3",
      "ports": [
        {
          "id": "3-IN-1",
          "name": "A1",
          "left": true,
          "disable": true,
          "property": ""
        },
        {
          "id": "3-OUT-1",
          "name": "B1",
          "left": false,
          "disable": true,
          "property": ""
        }
      ],
      "disable": false,
      "vn": "logic2",
      "index": 2,
      "events": [
        {
          "trigger": "CHANGE A1",
          "code": "PDO(\u0027SET_VALUE\u0027, \u0027B1\u0027, 0, PDS(\u0027VALUE\u0027, \u0027A1\u0027, 0))\n"
        }
      ],
      "pdm": {
        "A1": "logic1.B1",
        "B1": "light4.switch"
      },
      "states": []
    }
  ],
  "properties": [
    {
      "device": "HumanBodySensor",
      "name": "是否有人",
      "tal": "existStatus",
      "permission": "rn",
      "talType": "ANY",
      "range": [],
      "options": [],
      "getFunctionName": "getExistStatus",
      "setFunctionName": "setExistStatus"
    },
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
    }
  ],
  "counter": 5,
  "logicCounter": 0
}
