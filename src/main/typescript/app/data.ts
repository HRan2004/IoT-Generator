
export const data = {
  "name": "test",
  "devices": [
    {
      "id": "N1",
      "ports": [
        {
          "id": "1-OUT-1",
          "name": "是否有人",
          "left": false,
          "disable": true,
          "property": "existStatus"
        },
        {
          "id": "1-OUT-2",
          "name": "是否有人",
          "left": false,
          "disable": true,
          "property": "existStatus"
        }
      ],
      "disable": false,
      "name": "HumanMotionSensor",
      "vn": "humanBodySensor0",
      "index": 0,
      "tal": "HumanBodySensor",
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
        },
        {
          "id": "2-IN-2",
          "name": "开关",
          "left": true,
          "disable": true,
          "property": "switch"
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
      "id": "N5",
      "ports": [
        {
          "id": "5-IN-1",
          "name": "目标湿度值",
          "left": true,
          "disable": true,
          "property": "settledHumidity"
        }
      ],
      "disable": false,
      "name": "HouseholdHumidifier",
      "vn": "homeHumidifier2",
      "index": 2,
      "tal": "HomeHumidifier",
      "model": ""
    },
    {
      "id": "N6",
      "ports": [
        {
          "id": "6-OUT-1",
          "name": "门窗状态",
          "left": false,
          "disable": true,
          "property": "status"
        }
      ],
      "disable": false,
      "name": "DoorAndWindowSensor",
      "vn": "doorAndWindowSensor3",
      "index": 3,
      "tal": "DoorAndWindowSensor",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "4c21867a-eacb-4cd7-936a-48e9926a19f9",
      "source": {
        "cell": "N1",
        "port": "N3",
        "device": "humanBodySensor0",
        "property": "existStatus"
      },
      "target": {
        "cell": "1-OUT-2",
        "port": "3-IN-1",
        "device": "LOGIC",
        "property": ""
      },
      "disable": false
    },
    {
      "id": "4018b24c-3af4-4162-8070-8ae8ba43abf3",
      "source": {
        "cell": "N1",
        "port": "N2",
        "device": "humanBodySensor0",
        "property": "existStatus"
      },
      "target": {
        "cell": "1-OUT-1",
        "port": "2-IN-1",
        "device": "light1",
        "property": "switch"
      },
      "disable": false
    },
    {
      "id": "75d61c4c-6a9d-4e95-91bc-038b3d71abf0",
      "source": {
        "cell": "N2",
        "port": "N3",
        "device": "light1",
        "property": "switch"
      },
      "target": {
        "cell": "2-IN-2",
        "port": "3-OUT-1",
        "device": "LOGIC",
        "property": ""
      },
      "disable": false
    },
    {
      "id": "34f66f45-dd63-4f37-887b-ad013056c960",
      "source": {
        "cell": "N6",
        "port": "N3",
        "device": "doorAndWindowSensor3",
        "property": "status"
      },
      "target": {
        "cell": "6-OUT-1",
        "port": "3-IN-2",
        "device": "LOGIC",
        "property": ""
      },
      "disable": false
    },
    {
      "id": "c27aa686-94b8-4318-be57-cf36cdbce0dc",
      "source": {
        "cell": "N3",
        "port": "N5",
        "device": "LOGIC",
        "property": ""
      },
      "target": {
        "cell": "3-OUT-2",
        "port": "5-IN-1",
        "device": "homeHumidifier2",
        "property": "settledHumidity"
      },
      "disable": false
    }
  ],
  "logics": [
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
          "id": "3-IN-2",
          "name": "A2",
          "left": true,
          "disable": true,
          "property": ""
        },
        {
          "id": "3-IN-3",
          "name": "A3",
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
        },
        {
          "id": "3-OUT-2",
          "name": "B2",
          "left": false,
          "disable": true,
          "property": ""
        }
      ],
      "disable": false,
      "events": [
        {
          "trigger": "START",
          "code": "if(PDS(\u0027BOOLEAN\u0027, \u0027A1\u0027, 0)){\n  PDO(\u0027CONTROL_ROTATION\u0027, \u0027B1\u0027, 0)\n}\n"
        },
        {
          "trigger": "CHANGE A1",
          "code": "if(PDS(\u0027BOOLEAN_HAD\u0027, \u0027A1\u0027, 0)){\n  PDO(\u0027ROTATION_VALUE\u0027, \u0027B1\u0027, 0, 0)\n  PDO(\u0027ROTATION_TURNS_NUMBER\u0027, \u0027B1\u0027, 0, 0)\n}\n"
        },
        {
          "trigger": "EQUIP_STATE A1 0",
          "code": "PDO(\u0027CONTROL\u0027, \u0027B1\u0027, 0)\n"
        },
        {
          "trigger": "EQUIP_EXIST_STATUS A1 0",
          "code": "if(PDS(\u0027COMPARE\u0027, \u0027A1\u0027, 0, 10)){\n  \n}\n"
        },
        {
          "trigger": "COMPARE A1 0 10",
          "code": "if(PDS(\u0027COMPARE_TEXT\u0027, \u0027A1\u0027, 0, Hello)){\n  \n}\n"
        },
        {
          "trigger": "COMPARE_TEXT A1 Hello",
          "code": "PDO(\u0027SET_VALUE\u0027, \u0027B2\u0027, 0, PDS(\u0027VALUE\u0027, \u0027A2\u0027, 0))\n"
        }
      ],
      "pdm": {
        "A1": "humanBodySensor0.existStatus",
        "B1": "light1.switch",
        "A2": "doorAndWindowSensor3.status",
        "B2": "homeHumidifier2.settledHumidity"
      }
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
    },
    {
      "device": "HomeHumidifier",
      "name": "目标湿度值",
      "tal": "settledHumidity",
      "permission": "rwn",
      "talType": "ANY",
      "range": [],
      "options": [],
      "getFunctionName": "getSettledHumidity",
      "setFunctionName": "setHumidity"
    },
    {
      "device": "DoorAndWindowSensor",
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
  "counter": 4
}
