package com.jeejio.xiaomi.general.tal

import com.alibaba.fastjson2.JSONObject
import com.jeejio.xiaomi.general.tal.input.TalInput

class TalMethod (
    val name: String,
    val property: String = "",
    val type: TalMethodType = TalMethodType.BOTH,
    val describe: String = "",
    var parser: TalParser? = null,
    var inputs: Array<TalInput> = arrayOf(),
    var returns: Array<TalInput> = arrayOf(),
    var siid: Int = -1,
    var getCustom: Boolean = false,
    var setCustom: Boolean = false,
) {
    fun addInputs(vararg inputs: TalInput): TalMethod {
        this.inputs += inputs
        return this
    }
    fun addReturns(vararg inputs: TalInput): TalMethod {
        this.returns += inputs
        return this
    }

    fun checkValue(params: JSONObject): Boolean {
        if (inputs.isNotEmpty() && params.containsKey("value")) {
            return inputs[0].checkValue(params["value"] as Any)
        }
        return true
    }

    fun getInput(value: String): TalInput? {
        for (input in this.inputs) {
            if (input.key == value) {
                return input
            }
        }
        return null
    }

    fun getReturn(value: String): TalInput? {
        for (input in this.returns) {
            if (input.key == value) {
                return input
            }
        }
        return null
    }

    fun setParser(parser: TalParser): TalMethod {
        this.parser = parser
        return this
    }

    // var setCustomAction: (
    //     device: Device,
    //     params: JSONObject,
    //     batch: InfoBatch,
    // ) -> JSONObject? = { _, _, _ -> null }

    // var getCustomAction: (
    //     device: Device,
    //     params: JSONObject,
    //     batch: InfoBatch,
    // ) -> JSONObject? = { _, _, _ -> null }

    // fun addCustomAction(isGet: Boolean, action: (
    //     device: Device,
    //     params: JSONObject,
    //     batch: InfoBatch,
    // ) -> JSONObject?): TalMethod {
    //     if (isGet) {
    //         getCustom = true
    //         getCustomAction = action
    //     } else {
    //         setCustom = true
    //         setCustomAction = action
    //     }
    //     return this
    // }

    // fun addEasyAction(
    //     isGet: Boolean,
    //     siid: Int = 0,
    //     aiid: Int = 0,
    //     parser: (params: JSONObject) -> JSONObject = { it },
    //     clear: Boolean = false
    // ): TalMethod {
    //     if (isGet) {
    //         getCustom = true
    //         getCustomAction = { device: Device, params, batch ->
    //             device.doAction(siid, aiid, batch, parser(params))
    //         }
    //     } else {
    //         setCustom = true
    //         setCustomAction = { device: Device, params, batch ->
    //             device.doAction(siid, aiid, batch, parser(params))
    //         }
    //     }
    //     return this
    // }
}