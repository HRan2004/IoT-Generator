package com.hraps.iotgenerator

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.io.BufferedReader

import java.io.InputStream
import java.io.InputStreamReader


@SpringBootApplication
class IoTGeneratorApplication

fun main(args: Array<String>) {
    runApplication<IoTGeneratorApplication>(*args)
    if (Options.DEBUG_MODE) {
        val proc = Runtime.getRuntime().exec("ls")
        val fis: InputStream = proc.getInputStream()
        val isr = InputStreamReader(fis)
        val br = BufferedReader(isr)
        var line: String? = null
        while (br.readLine().also { line = it } != null) {
            println(line)
        }
    }
}
