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

export async function downloadImageFromUrl(
  url: string,
  { name, headers }: DownloadImageFromUrlSettings = {}
) {
  const file = getFilePath(getNameFromUrl(url) || name)
  await fs.downloadFile({ fromUrl: url, toFile: file, headers }).promise
  const mime = getMime(url)
  const base64 = await fs.readFile(file, 'base64')
  const uri = `data:${mime};base64,${base64}`
  await Share.open({
    urls: [uri],
    type: mime,
    saveToFiles: true,
  })
}
