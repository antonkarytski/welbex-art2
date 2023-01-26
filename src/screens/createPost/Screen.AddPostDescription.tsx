import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { createStateModel } from 'altek-toolkit'
import { MOCK_CATEGORIES } from '../../_mock/categories'
import ImagePreviewFormField from '../../features/createPost/ImagePreviewFormField'
import { createPostFormModel } from '../../features/createPost/model'
import BlockUploadFromCamera from '../../features/imagePick/Block.UploadFromCamera'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { primaryHeaderThemedStyles } from '../../navigation/elements/styles'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { useText } from '../../translations/hook'
import H3 from '../../ui/H3'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import { DropdownStyles } from '../../ui/dropdownTab/types'
import Field from '../../ui/form/Field'
import DropdownSelect from '../../ui/selects/DropdownSelect'

const selectedCategoryModel = createStateModel(MOCK_CATEGORIES[0])

selectedCategoryModel.$state.watch((value) => {
  createPostFormModel.setField({ value: value.name, key: 'category' })
})

export default function AddPostDescriptionScreen({
  route,
}: ScreenComponentProps<links.createPostAddDescription>) {
  const assets = route.params.assets
  const text = useText()
  const { styles } = useThemedStyleList({
    header: primaryHeaderThemedStyles,
    common: themedStyles,
    select: themedSelectStyles,
  })

  useEffect(() => {
    createPostFormModel.setField({
      value: assets[0].uri,
      key: 'imageUri',
    })
  }, [assets])

  return (
    <View style={styles.common.container}>
      <ScreenHeader
        backAvailable
        title={text.description}
        style={styles.header}
      />
      <ScrollView
        bounces={false}
        style={styles.common.scroll}
        contentContainerStyle={styles.common.scrollContent}
      >
        <ImagePreviewFormField
          name={'imageUri'}
          formModel={createPostFormModel}
          style={styles.common.image}
        />

        <H3 style={styles.common.header} label={text.completeDescription} />
        <Field
          label={text.title}
          name={'title'}
          formModel={createPostFormModel}
        />
        <DropdownSelect
          label={text.category}
          model={selectedCategoryModel}
          data={MOCK_CATEGORIES}
          labelExtractor={(val) => val.label}
          renderItem={(val) => <Span label={val.label} />}
          idExtractor={({ name }) => name}
          style={{ dropdownTab: styles.select }}
        />
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

const themedSelectStyles = createThemedStyle<DropdownStyles>((colors) =>
  StyleSheet.create({
    label: {
      marginTop: 20,
      marginBottom: 8,
      color: colors.textGrey,
    },
    tab: {
      marginBottom: 20,
      backgroundColor: colors.buttonLightBackgroundPressed,
      borderColor: colors.darkLine,
    },
    activeTab: {
      backgroundColor: colors.screenBackground,
      borderColor: colors.primary1,
    },
  })
)
