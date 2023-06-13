package com.jeejio.xiaomi.general.tal.input

import lombok.Builder
import lombok.Data
import lombok.NoArgsConstructor

@Data
@NoArgsConstructor
@Builder
class TalInput (
    val key: String,
    val type: TalInputType,
    val describe: String = "",
    val limit: Any = intArrayOf(),
    val required: Boolean = true,

    var range: FloatArray = floatArrayOf(),
    var options: Array<String> = arrayOf(),
) {
    init {
        if (limit is Array<*> && limit.isArrayOf<String>()) {
            this.options = limit as Array<String>
        } else if (limit is IntArray) {
            for (num in limit) {
                this.range += num.toFloat()
            }
        } else if (limit is FloatArray) {
            this.range = limit
        }
    }

    fun checkValue(value: Any): Boolean {
        if (type === TalInputType.INT) {
            if (value !is Int) return false
            if (range.isNotEmpty()) {
                if (value < range[0] || value > range[1]) return false
            }
        } else if (type === TalInputType.STRING) {
            if (value !is String) return false
            if (options.isNotEmpty()) {
                if (!options.contains(value)) return false
            }
        } else if (type === TalInputType.BOOLEAN) {
            if (value !is Boolean) return false
        }
        return true
    }

    fun hasLimit(): Boolean {
        if (options.isNotEmpty()) {
            range = floatArrayOf(0f, options.size - 1f, 1f)
        }
        return range.isNotEmpty()
    }
}