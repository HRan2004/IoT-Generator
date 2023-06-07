package com.hraps.iotgenerator.service.generate

import com.alibaba.fastjson2.JSONObject

fun main() {
    val jsonText = """
        {
            "name": "test",
            "cells": [
                {
                    "id": "83905d74-6a26-4a50-951f-cb190dba1dc8",
                    "source": {
                        "cell": "N1",
                        "port": "1-OUT-1"
                    },
                    "target": {
                        "cell": "N2",
                        "port": "2-IN-1"
                    }
                },
                {
                    "position": {
                        "x": 228.01040649414062,
                        "y": 445
                    },
                    "size": {
                        "width": 208,
                        "height": 112
                    },
                    "view": "react-shape-view",
                    "shape": "device-node",
                    "component": {
                        "key": null,
                        "ref": null,
                        "props": {},
                        "_owner": null
                    },
                    "ports": {
                        "groups": {
                            "left": {
                                "position": "left",
                                "attrs": {
                                    "circle": {
                                        "r": 10,
                                        "magnet": true,
                                        "stroke": "#ffffff00",
                                        "strokeWidth": 0,
                                        "fill": "#ffffff00"
                                    }
                                }
                            },
                            "right": {
                                "position": "right",
                                "attrs": {
                                    "circle": {
                                        "r": 10,
                                        "magnet": true,
                                        "stroke": "#ffffff00",
                                        "strokeWidth": 0,
                                        "fill": "#ffffff00"
                                    }
                                }
                            }
                        },
                        "items": [
                            {
                                "id": "1-IN-ADD",
                                "group": "left",
                                "text": "+",
                                "attrs": {
                                    "circle": {
                                        "r": 0
                                    },
                                    "data": {
                                        "disable": true
                                    }
                                }
                            },
                            {
                                "id": "1-OUT-1",
                                "group": "right",
                                "text": "是否有人",
                                "attrs": {
                                    "circle": {
                                        "r": 10
                                    },
                                    "data": {
                                        "disable": true,
                                        "originColor": "rgb(179, 117, 224)"
                                    }
                                }
                            },
                            {
                                "id": "1-OUT-ADD",
                                "group": "right",
                                "text": "+",
                                "attrs": {
                                    "circle": {
                                        "r": 0
                                    },
                                    "data": {
                                        "disable": true
                                    }
                                }
                            }
                        ]
                    },
                    "id": "N1",
                    "data": {
                        "device": "HumanMotionSensor",
                        "update": 3,
                        "connecting": null
                    },
                    "zIndex": 1
                },
                {
                    "position": {
                        "x": 700.0103759765625,
                        "y": 600
                    },
                    "size": {
                        "width": 208,
                        "height": 112
                    },
                    "view": "react-shape-view",
                    "shape": "device-node",
                    "component": {
                        "key": null,
                        "ref": null,
                        "props": {},
                        "_owner": null
                    },
                    "ports": {
                        "groups": {
                            "left": {
                                "position": "left",
                                "attrs": {
                                    "circle": {
                                        "r": 10,
                                        "magnet": true,
                                        "stroke": "#ffffff00",
                                        "strokeWidth": 0,
                                        "fill": "#ffffff00"
                                    }
                                }
                            },
                            "right": {
                                "position": "right",
                                "attrs": {
                                    "circle": {
                                        "r": 10,
                                        "magnet": true,
                                        "stroke": "#ffffff00",
                                        "strokeWidth": 0,
                                        "fill": "#ffffff00"
                                    }
                                }
                            }
                        },
                        "items": [
                            {
                                "id": "2-IN-1",
                                "group": "left",
                                "text": "开关",
                                "attrs": {
                                    "circle": {
                                        "r": 10
                                    },
                                    "data": {
                                        "disable": true
                                    }
                                }
                            },
                            {
                                "id": "2-IN-ADD",
                                "group": "left",
                                "text": "+",
                                "attrs": {
                                    "circle": {
                                        "r": 0
                                    },
                                    "data": {
                                        "disable": true,
                                        "originColor": "rgb(82, 155, 241)"
                                    }
                                }
                            },
                            {
                                "id": "2-OUT-ADD",
                                "group": "right",
                                "text": "+",
                                "attrs": {
                                    "circle": {
                                        "r": 0
                                    },
                                    "data": {
                                        "disable": true
                                    }
                                }
                            }
                        ]
                    },
                    "id": "N2",
                    "data": {
                        "device": "Lamp(Home)",
                        "connecting": null,
                        "update": 3
                    },
                    "zIndex": 2
                }
            ]
        }
    """.trimIndent()
    val json = JSONObject.parseObject(jsonText)
    val data = TaskData(json)
    val result = DoGenerate.generate(data)
    println(result)
}
