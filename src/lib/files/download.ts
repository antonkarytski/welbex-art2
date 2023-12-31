import { Platform } from 'react-native'
import fs from 'react-native-fs'
import Share from 'react-native-share'
import { mediaLibraryPermission } from '../../features/imagePick/model.permissions'
import { IS_ANDROID } from '../helpers/native/constants'
import { isExtensionImage } from './extensions'
import { getNameFromUrl } from './helpers'
import { getMime } from './mimeType'

type DownloadImageFromUrlSettings = {
  headers?: Record<string, string>
  name?: string
}

const TEMP_FILE_NAME = 'temp.jpg'

function getFilePath(fileName: string, defaultName = TEMP_FILE_NAME) {
  const extension = fileName?.split('.').pop()
  const isCorrectExtension = extension && isExtensionImage(extension)
  return `${fs.DocumentDirectoryPath}/${
    isCorrectExtension ? fileName : defaultName
  }`
}

const SAVE_DIR = `${fs.ExternalStorageDirectoryPath}/Pictures/Art2`
const endDownloading = Platform.select({
  ios: async (file: string) => {
    const name = getNameFromUrl(file)
    const base64 = await fs.readFile(file, 'base64')
    const mime = getMime(file)
    const uri = `data:${mime};base64,${base64}`
    await Share.open({
      url: uri,
      type: mime,
      saveToFiles: true,
      title: name,
    })
  },
  default: async (file: string) => {
    await fs.mkdir(SAVE_DIR, {
      NSURLIsExcludedFromBackupKey: true,
    })
    const fileName = getNameFromUrl(file)
    await fs.copyFile(file, `${SAVE_DIR}/${fileName}`)
    await fs.scanFile(`${SAVE_DIR}/${fileName}`)
  },
})

export async function downloadImageFromUrl(
  url: string,
  { name, headers }: DownloadImageFromUrlSettings = {}
) {
  if (IS_ANDROID) {
    const isGranted = await mediaLibraryPermission.check()
    if (!isGranted) return
  }
  const file = getFilePath(getNameFromUrl(url), name)
  await fs.downloadFile({ fromUrl: url, toFile: file, headers }).promise
  return await endDownloading(file)
}
