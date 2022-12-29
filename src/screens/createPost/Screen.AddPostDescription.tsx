import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ImagePreviewFormField from '../../features/createPost/ImagePreviewFormField'
import { createPostFormModel } from '../../features/createPost/model'
import BlockUploadFromCamera from '../../features/imagePick/Block.UploadFromCamera'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { primaryHeaderThemedStyles } from '../../navigation/elements/styles'
import { links } from '../../navigation/links'
import { RouterScreenProps } from '../../navigation/types.screenProps'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import Field from '../../ui/form/Field'

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
