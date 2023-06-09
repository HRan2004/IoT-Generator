
export default const data = {
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
          "tal": "ExistStatus"
        }
      ],
      "disable": false,
      "name": "HumanMotionSensor",
      "vn": "humanSensor0",
      "index": 0,
      "tal": "HumanSensor_1",
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
          "tal": "OnOff"
        }
      ],
      "disable": false,
      "name": "Lamp(Home)",
      "vn": "light1",
      "index": 1,
      "tal": "Light",
      "model": ""
    }
  ],
  "edges": [
    {
      "id": "83905d74-6a26-4a50-951f-cb190dba1dc8",
      "source": "N1",
      "target": "N2",
      "sourcePort": "1-OUT-1",
      "targetPort": "2-IN-1",
      "disable": false
    }
  ],
  "logics": [],
  "counter": 2
}
