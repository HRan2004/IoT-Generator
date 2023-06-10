package com.hraps.iotgenerator.utils

import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader
import java.util.concurrent.TimeUnit

object CommandUtils {

    fun runCommand(
        cmd: List<String>,
        workingDir: File = File("."),
        timeoutAmount: Long = 60L,
        timeUnit: TimeUnit = TimeUnit.SECONDS
    ): String? = runCatching {
        val process: Process = ProcessBuilder(cmd)
            .directory(workingDir)
            .redirectErrorStream(true)
            .start()
        val reader = BufferedReader(InputStreamReader(process.inputStream, "GBK"), 1)
        var line: String?
        while (reader.readLine().also { line = it } != null) {
            println(line)
        }
        "Run command finish."
    }.onFailure { it.printStackTrace() }.getOrNull()

    fun runPython(
        environmentPath: String,
        filePath: String,
    ) {
        val command = listOf("cmd.exe", "/c", "python", filePath)
        println(runCommand(command, File(environmentPath)))
    }

}