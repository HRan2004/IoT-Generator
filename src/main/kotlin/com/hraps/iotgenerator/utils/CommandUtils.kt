package com.hraps.iotgenerator.utils

import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader
import java.nio.charset.Charset
import java.nio.charset.StandardCharsets
import java.util.concurrent.TimeUnit

object CommandUtils {

    fun runCommand(
        cmd: List<String>,
        workingDir: File = File("."),
        timeoutAmount: Long = 60L,
        timeUnit: TimeUnit = TimeUnit.SECONDS
    ): String? = runCatching {
        val processBuilder = if (System.getProperty("os.name").toLowerCase().contains("win")) {
            ProcessBuilder("cmd.exe", "/c").apply {
                command().addAll(cmd)
                redirectErrorStream(true)
                directory(workingDir)
            }
        } else {
            ProcessBuilder(cmd).apply {
                redirectErrorStream(true)
                directory(workingDir)
            }
        }

        val process: Process = processBuilder.start()
        val reader = BufferedReader(InputStreamReader(
            process.inputStream,
            Charset.forName("GBK"),
        ))
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
        val command = listOf("python", filePath)
        println(runCommand(command, File(environmentPath)))
    }

}