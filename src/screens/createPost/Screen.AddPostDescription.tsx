import React, { useEffect } from 'react'
import { ImageStyle, ScrollView, StyleSheet, View } from 'react-native'
import { createStateModel } from 'altek-toolkit'
import { CategoryResponse } from '../../api/parts/categories/types'
import CategoriesSelect from '../../features/categories/CategoriesSelect'
import ImagePreviewFormField from '../../features/createPost/ImagePreviewFormField'
import { createPostFormModel } from '../../features/createPost/model'
import BlockUploadFromCamera from '../../features/imagePick/Block.UploadFromCamera'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { themedPrimaryGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'
import H3 from '../../ui/H3'
import PresetButton from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'

const selectedCategoryModel = createStateModel<null | CategoryResponse>(null)

selectedCategoryModel.$state.watch((value) => {
  if (value) {
    createPostFormModel.setField({ value: value.name, key: 'category' })
  }
})

export default function AddPostDescriptionScreen({
  route,
}: ScreenComponentProps<links.createPostAddDescription>) {
  const assets = route.params.assets
  const category = route.params.category
  const text = useText()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    gradient: themedPrimaryGradient,
  })

  useEffect(() => {
    if (category) selectedCategoryModel.set(category)
  }, [category])

  useEffect(() => {
    const asset = assets[0]
    if (!asset) return
    createPostFormModel.setField({
      value: {
        name: asset.fileName || '',
        size: asset.fileSize || 0,
        uri: asset.uri,
      },
      key: createPostFormModel.fields.imageFile,
    })
  }, [assets])

  //{
  //         uri: asset.uri,
  //         size: assets.size,
  //         name: asset.fileName,
  //       }

  return (
    <View style={styles.common.container}>
      <GradientScreenHeader
        gradient={{ colors: styles.gradient }}
        backAvailable
        title={text.description}
      />
      <ScrollView
        bounces={false}
        style={styles.common.scroll}
        contentContainerStyle={styles.common.scrollContent}
      >
        <ImagePreviewFormField
          name={createPostFormModel.fields.imageFile}
          formModel={createPostFormModel}
          style={styles.common.image as ImageStyle}
        />

        <H3 style={styles.common.header} label={text.completeDescription} />
        <Field
          label={text.title}
          name={'title'}
          formModel={createPostFormModel}
          styles={fieldStyles}
        />
        <CategoriesSelect model={selectedCategoryModel} />
        <Field
          disabled
          label={text.age}
          name={'age'}
          formModel={createPostFormModel}
        />
        <BlockUploadFromCamera
          style={styles.common.cameraBlock}
          label={text.uploadChildDocument}
        />
        <PresetButton
          style={styles.common.button}
          onPress={() => {}}
          label={text.submit}
        />
      </ScrollView>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: { flex: 1 },
    scroll: { flex: 1 },
    scrollContent: {
      paddingTop: 32,
      paddingHorizontal: 20,
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 20,
      borderRadius: 20,
    },
    header: {
      marginBottom: 24,
    },
    cameraBlock: {
      marginTop: 20,
      backgroundColor: colors.buttonLightBackgroundPressed,
      borderWidth: 1,
      borderColor: colors.darkLine,
    },
    button: { marginVertical: 24 },
  })
)

const fieldStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
})
