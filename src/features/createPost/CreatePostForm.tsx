import { ImagePickerAsset } from 'expo-image-picker'
import React, { useEffect } from 'react'
import { ImageStyle, ScrollView, StyleSheet } from 'react-native'
import { CategoryResponse } from '../../api/parts/categories/types'
import { noop } from '../../lib/helpers'
import { useNavigate } from '../../navigation'
import { themedPrimaryGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'
import H3 from '../../ui/H3'
import PresetButton from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import CategoriesSelect from '../categories/CategoriesSelect'
import BlockUploadFromCamera from '../imagePick/Block.UploadFromCamera'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import ImagePreviewFormField from './ImagePreviewFormField'
import { createPostFormModel } from './model'
import { selectedCategoryModel } from './model.categorySelect'

type CreatePostFormProps = {
  category?: CategoryResponse
  initialAssets?: ImagePickerAsset[]
}

const CreatePostForm = ({ category, initialAssets }: CreatePostFormProps) => {
  const text = useText()
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    gradient: themedPrimaryGradient,
  })

  useEffect(() => {
    if (category) selectedCategoryModel.set(category)
  }, [category])

  useEffect(() => {
    const asset = initialAssets?.[0]
    if (!asset) return
    createPostFormModel.setField({
      value: {
        name: asset.fileName || '',
        size: asset.fileSize || 0,
        uri: asset.uri,
      },
      key: createPostFormModel.fields.image,
    })
    createPostFormModel.setField({
      value: {
        name: asset.fileName || '',
        size: asset.fileSize || 0,
        uri: asset.uri,
      },
      key: createPostFormModel.fields.childDocument,
    })
  }, [initialAssets])

  return (
    <ScrollView
      bounces={false}
      style={styles.common.container}
      contentContainerStyle={styles.common.scrollContent}
    >
      <ImagePreviewFormField
        name={createPostFormModel.fields.image}
        formModel={createPostFormModel}
        style={styles.common.image as ImageStyle}
      />
      <H3 style={styles.common.header} label={text.completeDescription} />
      <Field
        label={text.title}
        name={createPostFormModel.fields.title}
        formModel={createPostFormModel}
        styles={fieldStyles}
      />
      <CategoriesSelect model={selectedCategoryModel} />
      <Field
        disabled
        label={text.age}
        name={createPostFormModel.fields.age}
        formModel={createPostFormModel}
        postfix={` ${text.yearsOldAbbreviated}`}
      />
      <BlockUploadFromCamera
        style={styles.common.cameraBlock}
        label={text.uploadChildDocument}
      />
      <PresetButton
        style={styles.common.button}
        onPress={() => {
          createPostFormModel
            .submit()
            .then(() => {})
            .catch(noop)
        }}
        label={text.submit}
      />
    </ScrollView>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: { flex: 1 },
    cameraBlock: {
      marginTop: 20,
      backgroundColor: colors.buttonLightBackgroundPressed,
      borderWidth: 1,
      borderColor: colors.darkLine,
    },
    header: {
      marginBottom: 24,
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 20,
      borderRadius: 20,
    },
    scrollContent: {
      paddingTop: 32,
      paddingHorizontal: 20,
    },
    button: { marginVertical: 24 },
  })
)

const fieldStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
})

export default CreatePostForm
