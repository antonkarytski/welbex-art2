import { KeyboardAvoidingView } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { createStateModel, useStateStore } from 'altek-toolkit'
import { MOCK_CATEGORIES } from '../../../_mock/categories'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import {
  buttonLightThemedPreset,
  buttonPrimaryThemedPreset,
} from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import DeleteButton from '../../../ui/buttons/Button.Delete'
import PresetButton from '../../../ui/buttons/PresetButton'
import Input from '../../../ui/input'
import DropdownSelect from '../../../ui/selects/DropdownSelect'
import { COUNTRIES_LIST } from '../../countries'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'

const categoryModel = createStateModel(MOCK_CATEGORIES[0])
const countryModel = createStateModel(COUNTRIES_LIST[0])
const drawingNameModel = createStateModel('')

const GalleryFilter = () => {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    dropdownTab: dropdownTabThemedStyles,
    input: inputThemedStyles,
  })

  const [drawingName, setDrawingName] = useStateStore(drawingNameModel)
  const [resultsCount, setResultsCount] = useState(105) // TODO: заменить при использовании бэкенд

  const onShowResults = () => {}
  const onReset = () => {}

  return (
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={commonStyles.fieldsWrapper}
      >
        <DropdownSelect
          label={t.categories}
          data={MOCK_CATEGORIES}
          idExtractor={({ label }) => label}
          model={categoryModel}
          renderItem={(item) => <Span label={item.label} />}
          labelExtractor={({ label }) => label}
          style={{ dropdownTab: styles.dropdownTab }}
          labelWeight={500}
        />
        <DropdownSelect
          label={t.country}
          data={COUNTRIES_LIST}
          idExtractor={({ alpha2Code }) => alpha2Code}
          model={countryModel}
          renderItem={(item) => <Span label={item.name} />}
          labelExtractor={({ name }) => name}
          style={{ dropdownTab: styles.dropdownTab }}
          labelWeight={500}
        />
        <Input
          label={t.drawingName}
          value={drawingName}
          onChangeText={setDrawingName}
          styles={styles.input}
        />
      </KeyboardAvoidingView>
      <PresetButton
        label={`${t.show} ${resultsCount} ${t.filterResults}`}
        onPress={onShowResults}
        preset={styles.buttonPrimary}
        style={commonStyles.resultsButton}
      />
      <DeleteButton
        label={t.reset}
        onPress={onReset}
        preset={styles.buttonLight}
        iconColor={colors.text}
      />
    </>
  )
}

const dropdownTabThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    label: {
      color: colors.textGrey,
      fontSize: 14,
      lineHeight: 20,
    },
    wrapper: {
      marginBottom: 20,
    },
  })
)

const commonStyles = StyleSheet.create({
  resultsButton: {
    marginTop: 'auto',
    marginBottom: 12,
  },
  fieldsWrapper: {
    paddingTop: 24,
  },
})

export default GalleryFilter
