import React from 'react'
import { ImageStyle, ScrollView, StyleSheet } from 'react-native'
import { IdentityDocumentStatus } from '../../api/parts/users/types.api'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { themedPrimaryGradient } from '../../styles/gradients'
import { inputThemedStyles } from '../../styles/inputs'
import { useText } from '../../translations/hook'
import H3 from '../../ui/H3'
import Field from '../../ui/form/Field'
import CategoriesSelect from '../categories/CategoriesSelect'
import ChildDocumentUploadingBlock from '../profile/childDocument/ChildDocumentUploadingBlock'
import { useChildDocumentStatus } from '../profile/childDocument/hooks'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import CreatePostFromSubmitButton from './CreatePostFromSubmitButton'
import ImagePreviewFormField from './ImagePreviewFormField'
import {
  CreatePostFormInitialProps,
  useCreatePostFormInitialValues,
} from './hook'
import { createPostFormModel } from './model'
import { selectedCategoryModel } from './model.categorySelect'

const CreatePostForm = (props: CreatePostFormInitialProps) => {
  const text = useText()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    gradient: themedPrimaryGradient,
    field: inputThemedStyles,
    buttonPreset: buttonPrimaryThemedPreset,
  })

  const isChildDocumentDetermined = useChildDocumentStatus(
    IdentityDocumentStatus.DETERMINED
  )
  useCreatePostFormInitialValues(props)

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
        styles={styles.field}
      />
      {!isChildDocumentDetermined && (
        <ChildDocumentUploadingBlock
          style={styles.common.cameraBlock}
          containerStyle={styles.common.cameraBlockContainer}
        />
      )}
      <CreatePostFromSubmitButton

        style={styles.common.button}
        preset={styles.buttonPreset}
      />
    </ScrollView>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: { flex: 1 },
    cameraBlock: {
      backgroundColor: colors.buttonLightBackgroundPressed,
      borderWidth: 1,
      borderColor: colors.darkLine,
    },
    cameraBlockContainer: {
      marginTop: 20,
    },
    header: {
      color: colors.text,
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
