package com.hraps.iotgenerator

import com.hraps.iotgenerator.utils.CommandUtils
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication


@SpringBootApplication
class IoTGeneratorApplication

fun main(args: Array<String>) {
    runApplication<IoTGeneratorApplication>(*args)
    if (Options.DEBUG_MODE) {
        println("Start debug browser...")
        CommandUtils.runPython("src/main/python/IoT-Ci", "ci.py")
    }
}

