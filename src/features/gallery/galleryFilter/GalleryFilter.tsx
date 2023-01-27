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
import { FONT_MEDIUM } from '../../../styles/fonts'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import DeleteButton from '../../../ui/buttons/Button.Delete'
import PresetButton from '../../../ui/buttons/PresetButton'
import Input from '../../../ui/input'
import DropdownSelect from '../../../ui/selects/DropdownSelect'
import MultiSlider from '../../../ui/slider/MultiSlider'
import CountriesDropdownSelect, {
  createCountryModel,
} from '../../countries/CountriesDropdownSelect'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'

const categoryModel = createStateModel(MOCK_CATEGORIES[0])
const countryModel = createCountryModel()
const drawingNameModel = createStateModel('')
const ageModel = createStateModel([2, 7])

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
        />
        <CountriesDropdownSelect model={countryModel} />
        <Input
          label={t.drawingName}
          value={drawingName}
          onChangeText={setDrawingName}
          styles={styles.input}
        />
        <MultiSlider model={ageModel} label={t.age} min={2} max={15} step={1} />
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
      fontFamily: FONT_MEDIUM,
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
