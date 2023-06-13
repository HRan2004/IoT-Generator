package com.hraps.iotgenerator.generate

import com.alibaba.fastjson2.JSONObject

fun main() {
    val jsonText = """
        {
            "name": "test",
            "cells": [
                {
                    "id": "c3fd5597-7af7-4eed-a700-89f4ce3db508",
                    "source": {
                        "cell": "N2",
                        "port": "2-OUT-1"
                    },
                    "target": {
                        "cell": "N1",
                        "port": "1-IN-1"
                    }
                },
                {
                    "id": "a171051c-c32c-44d4-843b-9956058c2aca",
                    "source": {
                        "cell": "N1",
                        "port": "1-OUT-1"
                    },
                    "target": {
                        "cell": "N3",
                        "port": "3-IN-1"
                    }
                },
                {
                    "position": {
                        "x": 330,
                        "y": 400
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
                                "id": "1-IN-1",
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
                                "id": "1-IN-ADD",
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
                                "id": "1-OUT-1",
                                "group": "right",
                                "text": "开关",
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
                        "device": "Lamp(Home)",
                        "connecting": null,
                        "update": 6
                    },
                    "zIndex": 1
                },
                {
                    "position": {
                        "x": 40,
                        "y": 210
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
                                "id": "2-IN-ADD",
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
                                "id": "2-OUT-1",
                                "group": "right",
                                "text": "开关",
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
                        "device": "HumanMotionSensor",
                        "update": 5,
                        "connecting": null
                    },
                    "zIndex": 2
                },
                {
                    "position": {
                        "x": 680,
                        "y": 590
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
                                "id": "3-IN-1",
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
                                "id": "3-IN-ADD",
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
                                "id": "3-OUT-ADD",
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
                    "id": "N3",
                    "data": {
                        "device": "HouseholdHumidifier",
                        "connecting": null,
                        "update": 5
                    },
                    "zIndex": 3
                }
            ]
        }
    """.trimIndent()
    val json = JSONObject.parseObject(jsonText)
    val data = TaskData(json)
    val result = DoGenerate.generate(data)
    println(result)
}
