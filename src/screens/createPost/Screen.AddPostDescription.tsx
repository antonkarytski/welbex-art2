import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { createStateModel } from 'altek-toolkit'
import ImagePreviewFormField from '../../features/createPost/ImagePreviewFormField'
import { createPostFormModel } from '../../features/createPost/model'
import BlockUploadFromCamera from '../../features/imagePick/Block.UploadFromCamera'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createSelectModel } from '../../lib/componentsModels/model.select'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { primaryHeaderThemedStyles } from '../../navigation/elements/styles'
import { links } from '../../navigation/links'
import { RouterScreenProps } from '../../navigation/types.screenProps'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import Select from '../../ui/dropdownSelect/DropdownSelect'
import Field from '../../ui/form/Field'

const m = createSelectModel()

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
      {/*<Select*/}
      {/*  data={[{ a: 2 }, { a: 3 }]}*/}
      {/*  renderItem={() => {*/}
      {/*    return <Span label={'HELLO'} />*/}
      {/*  }}*/}
      {/*  idExtractorName={'a'}*/}
      {/*  model={m}*/}
      {/*/>*/}
      <BlockUploadFromCamera />
    </ScrollView>
  )
}

const themedStyles = createThemedStyle((colors) => StyleSheet.create({}))
