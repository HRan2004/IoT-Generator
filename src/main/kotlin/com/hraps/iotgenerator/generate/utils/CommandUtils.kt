package com.hraps.iotgenerator.generate.utils

import java.io.File
import java.util.concurrent.TimeUnit

object CommandUtils {

    fun run(
        cmd: List<String>,
        workingDir: File = File("."),
        timeoutAmount: Long = 60L,
        timeUnit: TimeUnit = TimeUnit.SECONDS
    ): String? = runCatching {
        ProcessBuilder(cmd)
            .directory(workingDir)
            .redirectErrorStream(true)
            .start().also { it.waitFor(timeoutAmount, timeUnit) }
            .inputReader().readText()
    }.onFailure { it.printStackTrace() }.getOrNull()

}