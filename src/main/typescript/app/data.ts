
export const data = {
  "name": "test",
  "devices": [
    {
      "id": "N1",
      "ports": [
        {
          "id": "1-OUT-1",
          "name": "色温",
          "left": false,
          "disable": true,
          "property": "colorTemperature"
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
    }
  ],
  "edges": [
    {
      "id": "b6d4b6a0-81f2-4511-9168-16eecbdc9e84",
      "source": {
        "cell": "N3",
        "port": "3-OUT-1",
        "device": "Logic",
        "property": ""
      },
      "target": {
        "cell": "N4",
        "port": "4-IN-1",
        "device": "Logic",
        "property": ""
      },
      "disable": false
    },
    {
      "id": "106420ca-694d-4332-82ea-9d28d2a9b408",
      "source": {
        "cell": "N4",
        "port": "4-OUT-1",
        "device": "Logic",
        "property": ""
      },
      "target": {
        "cell": "N5",
        "port": "5-IN-1",
        "device": "Logic",
        "property": ""
      },
      "disable": false
    },
    {
      "id": "16085481-8f53-43e7-bc2e-ace72622f28f",
      "source": {
        "cell": "N5",
        "port": "5-OUT-1",
        "device": "Logic",
        "property": ""
      },
      "target": {
        "cell": "N2",
        "port": "2-IN-1",
        "device": "light1",
        "property": "colorTemperature"
      },
      "disable": false
    },
    {
      "id": "L1",
      "source": {
        "cell": "N1",
        "port": "1-OUT-1",
        "device": "light0",
        "property": "colorTemperature"
      },
      "target": {
        "cell": "N3",
        "port": "3-IN-1",
        "device": "Logic",
        "property": ""
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
          "id": "3-OUT-1",
          "name": "B1",
          "left": false,
          "disable": true,
          "property": ""
        }
      ],
      "disable": false,
      "vn": "logic0",
      "index": 0,
      "events": [
        {
          "trigger": "CHANGE A1",
          "code": "PDO(\u0027SET_VALUE\u0027, \u0027B1\u0027, 0, PDS(\u0027VALUE\u0027, \u0027A1\u0027, 0))\n"
        }
      ],
      "pdm": {
        "B1": "logic0.B1",
        "A1": "light0.colorTemperature"
      },
      "states": [
        "B1"
      ]
    },
    {
      "id": "N4",
      "ports": [
        {
          "id": "4-IN-1",
          "name": "A1",
          "left": true,
          "disable": true,
          "property": ""
        },
        {
          "id": "4-OUT-1",
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
        "A1": "logic0.B1",
        "B1": "logic1.B1"
      },
      "states": [
        "B1"
      ]
    },
    {
      "id": "N5",
      "ports": [
        {
          "id": "5-IN-1",
          "name": "A1",
          "left": true,
          "disable": true,
          "property": ""
        },
        {
          "id": "5-OUT-1",
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
        "B1": "light1.colorTemperature"
      },
      "states": []
    }
  ],
  "properties": [
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
    }
  ],
  "counter": 2,
  "logicCounter": 3
}
