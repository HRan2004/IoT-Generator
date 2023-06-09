
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
          "tal": "onOff"
        },
        {
          "id": "1-OUT-1",
          "name": "开关",
          "left": false,
          "disable": true,
          "tal": "onOff"
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
      "id": "N2",
      "ports": [
        {
          "id": "2-OUT-1",
          "name": "是否有人",
          "left": false,
          "disable": true,
          "tal": "existStatus"
        }
      ],
      "disable": false,
      "name": "HumanMotionSensor",
      "vn": "humanSensor1",
      "index": 1,
      "tal": "HumanSensor_1",
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
          "tal": "onOff"
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
      "id": "c3fd5597-7af7-4eed-a700-89f4ce3db508",
      "source": "N2",
      "target": "N1",
      "sourcePort": "2-OUT-1",
      "targetPort": "1-IN-1",
      "disable": false
    },
    {
      "id": "a171051c-c32c-44d4-843b-9956058c2aca",
      "source": "N1",
      "target": "N3",
      "sourcePort": "1-OUT-1",
      "targetPort": "3-IN-1",
      "disable": false
    }
  ],
  "logics": [],
  "counter": 3
}
