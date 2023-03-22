import { useStore } from 'effector-react'
import React from 'react'
import { ImageStyle, ScrollView, StyleSheet } from 'react-native'
import { IdentityDocumentStatus } from '../../api/parts/users/types.api'
import { themedPrimaryGradient } from '../../styles/gradients'
import { inputThemedStyles } from '../../styles/inputs'
import { useText } from '../../translations/hook'
import H3 from '../../ui/H3'
import Field from '../../ui/form/Field'
import CategoriesSelect from '../categories/CategoriesSelect'
import { $myProfile } from '../profile/model'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import ChildDocumentUploadingBlock from './ChildDocumentUploadingBlock'
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
  })
  const myProfile = useStore($myProfile)

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
      {myProfile?.identity_determined_status_id !==
        IdentityDocumentStatus.DETERMINED && (
        <ChildDocumentUploadingBlock style={styles.common.cameraBlock} />
      )}
      <CreatePostFromSubmitButton style={styles.common.button} />
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
