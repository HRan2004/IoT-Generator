package com.hraps.iotgenerator.utils

import java.io.BufferedInputStream
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

object ZipUtils {

    fun zip(folderPath: String, zipFilePath: String) {
        val sourceFolder = File(folderPath)
        val zipFile = File(zipFilePath)

        val fos = FileOutputStream(zipFile)
        val zos = ZipOutputStream(fos)

        compressFolder(sourceFolder, "", zos)

        zos.close()
        fos.close()
    }

    private fun compressFolder(folder: File, parentEntryPath: String, zos: ZipOutputStream) {
        val files = folder.listFiles() ?: return

        for (file in files) {
            if (file.isDirectory) {
                compressFolder(file, "$parentEntryPath${file.name}/", zos)
            } else {
                val buffer = ByteArray(1024)
                val fis = FileInputStream(file)
                zos.putNextEntry(ZipEntry("$parentEntryPath${file.name}"))

                var length: Int
                while (fis.read(buffer).also { length = it } > 0) {
                    zos.write(buffer, 0, length)
                }

                zos.closeEntry()
                fis.close()
            }
        }
    }

    fun listAllFiles(dir: File): List<File> {
        val result = mutableListOf<File>()
        val files = dir.listFiles()
        if (files == null || files.isEmpty()) return result
        for (file in files) {
            if (file.isDirectory) {
                result.addAll(listAllFiles(file))
            } else {
                result.add(file)
            }
        }
        return result
    }

}