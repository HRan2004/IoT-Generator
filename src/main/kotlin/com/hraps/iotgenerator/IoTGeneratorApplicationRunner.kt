package com.hraps.iotgenerator

import com.hraps.iotgenerator.utils.CommandUtils
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component

@Component
class IoTGeneratorApplicationRunner: ApplicationRunner {

    override fun run(args: ApplicationArguments?) {
        if (Options.DEBUG_MODE) {
            println("Start debug browser...")
            CommandUtils.runPython("src/main/python/IoT-Ci", "ci.py")
        }
    }

}