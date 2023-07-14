
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
          "property": "switch"
        }
      ],
      "disable": false,
      "name": "Lamp(Home)",
      "vn": "light0",
      "index": 0,
      "tal": "Light",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "d86b9843-9174-42e7-9c55-5ca0b75a4e91",
      "source": {
        "cell": "N2",
        "port": "N1",
        "device": "LOGIC",
        "property": ""
      },
      "target": {
        "cell": "2-OUT-1",
        "port": "1-IN-1",
        "device": "light0",
        "property": "switch"
      },
      "disable": false
    }
  ],
  "logics": [
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
      "events": [
        {
          "trigger": "EQUIP_STATE A1 0",
          "code": "for(let i\u003d0;i\u003c3;i++){\n  PDO(\u0027CONTROL\u0027, \u0027B1\u0027, 0)\n  sleep(1 * 1000)\n  PDO(\u0027CONTROL\u0027, \u0027B1\u0027, 1)\n  sleep(1 * 1000)\n}\n"
        }
      ],
      "pdm": {
        "B1": "light0.switch"
      }
    }
  ],
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
    }
  ],
  "counter": 1
}
