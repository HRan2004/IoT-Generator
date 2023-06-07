package com.hraps.iotgenerator.service.generate.classes

import com.alibaba.fastjson2.JSONObject

class Logic (
    val id: String,
    val name: String = "",
    val data: JSONObject = JSONObject(),
    val disable: Boolean = false,
)