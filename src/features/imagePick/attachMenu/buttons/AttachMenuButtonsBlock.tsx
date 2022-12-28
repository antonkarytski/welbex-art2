import * as DocumentPicker from 'expo-document-picker'
import { ImagePickerAsset } from 'expo-image-picker'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FilesIcon, GalleryIcon, LocationIcon } from 'altek-ui'
import { useText } from '../../../../translations/hook'
import { pickFromCameraRoll } from '../../pickFiles'
import { AttachMenuButtons, Document } from '../types'
import { ButtonSource } from './Button.Source'

export enum PickerButton {
  GALLERY = 1,
  FILES,
  LOCATION,
}

type GalleryPickResult = {
  type: PickerButton.GALLERY
  data: ImagePickerAsset
}
type DocumentPickResult = {
  type: PickerButton.FILES
  data: Document
}
export type AttachMenuButtonsPickResult = GalleryPickResult | DocumentPickResult
type AttachMenuButtonsBlockProps = {
  buttons: AttachMenuButtons
  onPick: (props: AttachMenuButtonsPickResult | null) => void
}

const AttachMenuButtonsBlock = ({
  buttons,
  onPick,
}: AttachMenuButtonsBlockProps) => {
  const text = useText()

  async function pickFromGallery() {
    try {
      const pickResult = await pickFromCameraRoll()
      return onPick(
        pickResult ? { type: PickerButton.GALLERY, data: pickResult } : null
      )
    } catch {}
    onPick(null)
  }

  async function pickDocument() {
    try {
      const documentsPickResult = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: false,
      })
      if (documentsPickResult.type !== 'success') return onPick(null)
      const { type, ...data } = documentsPickResult
      onPick({ type: PickerButton.FILES, data })
    } catch {}
    onPick(null)
  }

  if (!Object.keys(buttons).length) {
    return <View style={styles.empty} />
  }
  return (
    <View style={styles.container}>
      {buttons.gallery ? (
        <ButtonSource
          Icon={GalleryIcon}
          title={text.gallery}
          onPress={pickFromGallery}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: 10,
    height: 70,
  },

  empty: {
    marginTop: 'auto',
    height: 5,
  },
})

export default AttachMenuButtonsBlock
