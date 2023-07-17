package com.hraps.iotgenerator.utils

import java.io.*

object FileUtils {

    fun copyFile(from: String, to: String): Boolean {
        try {
            val fromFile = File(from)
            val toFile = File(to)
            if (!fromFile.exists()) {
                println("File not exists: $from")
                return false
            }
            while (toFile.exists()) {
                toFile.delete()
            }
            fromFile.copyTo(toFile)
            return true
        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
        }
        return false
    }

    fun copyFileNew(srcPath: String, dstPath: String) {
        File(srcPath).runCatching {
            takeIf { it.exists() }?.inputStream()?.use { inputStream ->
                File(dstPath).outputStream().use { outputStream ->
                    inputStream.copyTo(outputStream)
                }
            }
        }.onFailure {
            it.printStackTrace()
        }
    }

    fun read(path: String): String {
        var content = ""
        val file = File(path)
        if (!file.isDirectory) {
            try {
                val fis: InputStream = FileInputStream(file)
                var line: String? = null
                val br = BufferedReader(
                    InputStreamReader(
                        FileInputStream(file), "UTF-8"
                    )
                )
                while (br.readLine().also { line = it } != null) {
                    content += "$line\n"
                }
                fis.close()
            } catch (_: FileNotFoundException) {
            } catch (_: IOException) {
            }
        }
        return content
    }

    fun write(path: String, content: String) {
        val file = File(path)
        if (!file.exists()) {
            file.createNewFile()
        }
        val out = FileOutputStream(file)
        out.write(content.toByteArray())
        out.flush()
        out.close()
    }

}