package com.hraps.iotgenerator.utils

import java.io.*
import java.nio.file.Files
import java.nio.file.StandardCopyOption

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

    fun copyFolder(sourcePath: String, destinationPath: String) {
        val sourceFile = File(sourcePath)
        val destinationFile = File(destinationPath)

        if (!sourceFile.exists()) {
            return
        }
        if (destinationFile.exists()) {
            destinationFile.deleteRecursively()
        }

        copyFolderRecursive(sourceFile, destinationFile)
    }

    fun copyFolderRecursive(source: File, destination: File) {
        if (source.isDirectory) {
            if (!destination.exists()) {
                destination.mkdir()
            }

            val files = source.listFiles()
            if (files != null) {
                for (file in files) {
                    val newDestination = File(destination, file.name)
                    copyFolderRecursive(file, newDestination)
                }
            }
        } else {
            Files.copy(source.toPath(), destination.toPath(), StandardCopyOption.REPLACE_EXISTING)
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