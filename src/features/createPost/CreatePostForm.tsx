import { useStoreMap } from 'effector-react'
import React from 'react'
import { ImageStyle, ScrollView, StyleSheet } from 'react-native'
import { CategoryResponse } from '../../api/parts/categories/types'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { themedPrimaryGradient } from '../../styles/gradients'
import { inputThemedStyles } from '../../styles/inputs'
import { useText } from '../../translations/hook'
import H3 from '../../ui/H3'
import Field from '../../ui/form/Field'
import CategoriesSelect from '../categories/CategoriesSelect'
import { $availableCategories } from '../profile/model.availableCategories'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { useMergedStyles } from '../themed/hooks.merge'
import CreatePostFromSubmitButton from './CreatePostFromSubmitButton'
import ImagePreviewFormField from './ImagePreviewFormField'
import {
  CreatePostFormInitialProps,
  useCreatePostFormInitialValues,
} from './hook'
import { createPostFormModel } from './model'
import { selectedCategoryModel } from './model.categorySelect'
import PostMonthSelect from './postMonth/PostMonthSelect'

const CreatePostForm = (props: CreatePostFormInitialProps) => {
  const text = useText()
  const categoriesFilter = useStoreMap({
    store: $availableCategories,
    keys: [],
    fn: (categories) => {
      if (!categories) return
      const mask = [
        ...new Set([...categories.current_month, ...categories.next_month]),
      ]
      return (category: CategoryResponse) => mask.includes(category.id)
    },
  })
  const { styles } = useThemedStyleList({
    common: themedStyles,
    gradient: themedPrimaryGradient,
    field: inputThemedStyles,
    buttonPreset: buttonPrimaryThemedPreset,
  })

  const inputStyles = useMergedStyles([styles.field, fieldStyles])
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
      <CategoriesSelect
        style={selectStyles}
        model={selectedCategoryModel}
        filter={categoriesFilter}
      />
      <Field
        disabled
        label={text.age}
        name={createPostFormModel.fields.age}
        formModel={createPostFormModel}
        postfix={` ${text.yearsOldAbbreviated}`}
        styles={inputStyles}
      />
      <PostMonthSelect style={selectStyles} />
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
    button: { marginTop: 4, marginBottom: 54 },
  })
)

const fieldStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  wrapper: {
    marginBottom: 0,
  },
  input: {
    height: 52,
  },
})

const dropdownTabStyles = StyleSheet.create({
  tab: {
    height: 52,
  },
  wrapper: {
    marginBottom: 20,
  },
})

const selectStyles = {
  dropdownTab: dropdownTabStyles,
}

export default CreatePostForm
