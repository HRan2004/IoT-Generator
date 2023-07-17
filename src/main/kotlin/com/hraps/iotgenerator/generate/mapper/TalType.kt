package com.hraps.iotgenerator.generate.mapper

import java.util.*


class TalType(
    var type: DataType = DataType.ANY,
    var range: DoubleArray = doubleArrayOf(),
    var options: Array<String> = arrayOf(),
) {

    fun fromText(ct: String): TalType {
        val args = ct.split(':')
        this.type = DataType.valueOf(args[0].uppercase(Locale.getDefault()))
        if (args.size > 1) {
            val arg = args[1]
            if (this.isNumber()) {
                val range = arg.split(',')
                if (range.size >= 2) {
                    this.range = doubleArrayOf(
                        range[0].toDouble(),
                        range[1].toDouble(),
                        if (range.size >= 3) range[2].toDouble() else 1.0
                    )
                }
            } else if (this.type === DataType.STRING) {
                this.options = arg.split(',').toTypedArray()
            }
        }
        return this
    }

    fun isNumber(): Boolean {
        return this.type === DataType.INT || this.type === DataType.FLOAT
    }

    fun hadRange(): Boolean {
        return this.range.size >= 2 && this.range[0] != -1.0 && this.range[1] != -1.0
    }

    fun isInRange(value: Double): Boolean {
        return value >= this.range[0] && value <= this.range[1]
    }

    fun hadOptions(): Boolean {
        return this.options.isNotEmpty()
    }

    fun indexInOptions(value: String): Int {
        return this.options.indexOf(value)
    }

    fun toCtText(): String {
        return "${this.type.name}:${if (this.hadRange()) "${this.range[0]},${this.range[1]}" else ""}${if (this.hadOptions()) this.options.joinToString(",") else ""}"
    }
}

enum class DataType(value: String) {
    INT("INT"),
    FLOAT("FLOAT"),
    BOOLEAN("BOOLEAN"),
    STRING("STRING"),
    OBJECT("OBJECT"),
    ANY("ANY"),
    NONE("NONE"),
}
