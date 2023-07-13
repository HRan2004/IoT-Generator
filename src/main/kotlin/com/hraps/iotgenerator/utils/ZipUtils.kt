package com.hraps.iotgenerator.utils

import java.io.BufferedInputStream
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

object ZipUtils {

    fun zip(fromDirPath: String, outputPath: String) {
        val files = listAllFiles(File(fromDirPath))
        val fos = FileOutputStream(outputPath)
        val zos = ZipOutputStream(fos)
        for (file in files) {
            val fis = FileInputStream(file)
            val bis = BufferedInputStream(fis)
            val entry = ZipEntry(file.name)
            zos.putNextEntry(entry)
            val buffer = ByteArray(1024)
            var read = 0
            while (bis.read(buffer).also { read = it } != -1) {
                zos.write(buffer, 0, read)
            }
            bis.close()
            fis.close()
        }
        zos.close()
        fos.close()
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