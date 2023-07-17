package com.hraps.iotgenerator.utils

import java.io.*

object FileUtils {

    fun copyFile(srcPath: String, dstPath: String) {
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

    fun copyFolder(sourcePath: String, destinationPath: String): Boolean {
        val source = File(sourcePath)
        val destination = File(destinationPath)

        if (!source.exists() || !source.isDirectory) {
            return false
        }

        if (destination.exists()) {
            destination.deleteRecursively()
        }

        try {
            if (!destination.exists()) {
                destination.mkdirs()
            }

            val files = source.list() ?: return false

            for (file in files) {
                val srcFile = File(source, file)
                val destFile = File(destination, file)
                copyFolder(srcFile.path, destFile.path)
            }
        } catch (e: IOException) {
            e.printStackTrace()
            return false
        }

        return true
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