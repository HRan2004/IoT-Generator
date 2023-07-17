package com.hraps.iotgenerator.generate.mapper


class TalType(
    private var ct: String = ""
) {
    var type: DataType = DataType.ANY
    var range: DoubleArray = doubleArrayOf(-1.0, -1.0, 1.0)
    var options: Array<String> = arrayOf()

    init {
        // Ct Example  int:0,100,1  string:OPEN,CLOSE  boolean  any
        val args = ct.split(':')
        this.type = DataType.valueOf(args[0])
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
    }

    fun isNumber(): Boolean {
        return this.type === DataType.INT || this.type === DataType.FLOAT
    }

    fun hadRange(): Boolean {
        return this.range[0] != -1.0 && this.range[1] != -1.0
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
        this.ct = "${this.type.name}:${if (this.hadRange()) "${this.range[0]},${this.range[1]}" else ""}${if (this.hadOptions()) this.options.joinToString(",") else ""}"
        return this.ct
    }
}

enum class DataType(value: String) {
    INT("int"),
    FLOAT("float"),
    BOOLEAN("bool"),
    STRING("string"),
    OBJECT("object"),
    ANY("any"),
    NONE("none"),
}
