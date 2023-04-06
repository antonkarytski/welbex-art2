import { Platform } from 'react-native'
import fs from 'react-native-fs'
import Share from 'react-native-share'
import { isExtensionImage } from './extensions'
import { getNameFromUrl } from './helpers'
import { getMime } from './mimeType'

type DownloadImageFromUrlSettings = {
  headers?: Record<string, string>
  name?: string
}

const TEMP_FILE_NAME = 'temp.jpg'

function getFilePath(fileName?: string) {
  const extension = fileName?.split('.').pop()
  const isCorrectExtension = extension && isExtensionImage(extension)
  return `${fs.DocumentDirectoryPath}/${
    isCorrectExtension ? fileName : TEMP_FILE_NAME
  }`
}

const endDownloading = Platform.select({
  ios: async (file: string) => {
    const base64 = await fs.readFile(file, 'base64')
    const mime = getMime(file)
    const uri = `data:${mime};base64,${base64}`
    await Share.open({
      urls: [uri],
      type: mime,
      saveToFiles: true,
    })
  },
  default: async (file: string) => {
    await fs.copyFile(
      file,
      `${fs.DownloadDirectoryPath}/${getNameFromUrl(file)}`
    )
  },
})

export async function downloadImageFromUrl(
  url: string,
  { name, headers }: DownloadImageFromUrlSettings = {}
) {
  const file = getFilePath(getNameFromUrl(url) || name)
  await fs.downloadFile({ fromUrl: url, toFile: file, headers }).promise
  return await endDownloading(file)
}
