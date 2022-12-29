import React, { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { createStateModel, useStateStore } from 'altek-toolkit'
import { MOCK_CATEGORIES } from '../../_mock/categories'
import ImagePreviewFormField from '../../features/createPost/ImagePreviewFormField'
import { createPostFormModel } from '../../features/createPost/model'
import BlockUploadFromCamera from '../../features/imagePick/Block.UploadFromCamera'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useFormField } from '../../lib/componentsModels/model.form'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { primaryHeaderThemedStyles } from '../../navigation/elements/styles'
import { links } from '../../navigation/links'
import { RouterScreenProps } from '../../navigation/types.screenProps'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import Select from '../../ui/dropdownSelect/DropdownSelect'
import Field from '../../ui/form/Field'

const selectedCategoryModel = createStateModel(MOCK_CATEGORIES[0])

selectedCategoryModel.$state.watch((value) => {
  createPostFormModel.setField({ value: value.name, key: 'category' })
})

export default function AddPostDescriptionScreen({
  route,
}: RouterScreenProps<links.createPostAddDescription>) {
  const assets = route.params.asset
  const text = useText()
  const { styles } = useThemedStyleList({
    header: primaryHeaderThemedStyles,
    common: themedStyles,
  })

  return (
    <ScrollView>
      <ScreenHeader
        backAvailable
        title={text.description}
        style={styles.header}
      />
      <ImagePreviewFormField
        name={'imageUri'}
        formModel={createPostFormModel}
      />
      <Span label={text.completeDescription} />
      <Field label={'title'} name={'title'} formModel={createPostFormModel} />
      <Field
        label={'category'}
        name={'title'}
        formModel={createPostFormModel}
      />
      <Field
        disabled
        label={'age'}
        name={'title'}
        formModel={createPostFormModel}
      />
      <Select
        model={selectedCategoryModel}
        data={MOCK_CATEGORIES}
        labelExtractor={(val) => val.label}
        renderItem={(val) => <Span label={val.label} />}
        idExtractor={({ name }) => name}
      />
      <BlockUploadFromCamera />
    </ScrollView>
  )
}

const themedStyles = createThemedStyle((colors) => StyleSheet.create({}))
