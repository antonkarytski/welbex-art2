import { useStore } from 'effector-react'
import { KeyboardAvoidingView } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { CATEGORIES_AGE_RANGE } from '../../../constants/categories'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import {
  buttonLightThemedPreset,
  buttonPrimaryThemedPreset,
} from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import DeleteButton from '../../../ui/buttons/Button.Delete'
import PresetButton from '../../../ui/buttons/PresetButton'
import Input from '../../../ui/input'
import MultiSlider from '../../../ui/slider/MultiSlider'
import CategoriesSelect from '../../categories/CategoriesSelect'
import CountriesDropdownSelect from '../../countries/CountriesDropdownSelect'
import { useThemedStyleList } from '../../themed/hooks'
import {
  ageRangeModel,
  categoryModel,
  countryModel,
  countrySearchModel,
  drawingNameModel,
  resetGalleryFilter,
} from './model.galleryFilter'
import { countOfFilteredArtsModel } from './request'

// TODO: ! change selects to multiSelects !

const GalleryFilter = () => {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    input: inputThemedStyles,
  })

  const [drawingName, setDrawingName] = useStateStore(drawingNameModel)
  const filterResult = useStore(countOfFilteredArtsModel.$data)

  const onShowResults = () => {}

  return (
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={commonStyles.fieldsWrapper}
      >
        <CategoriesSelect model={categoryModel} />
        <CountriesDropdownSelect
          model={countryModel}
          searchModel={countrySearchModel}
        />
        <Input
          label={t.drawingName}
          value={drawingName}
          onChangeText={setDrawingName}
          styles={styles.input}
        />
        <MultiSlider
          label={t.age}
          model={ageRangeModel}
          min={CATEGORIES_AGE_RANGE[0]}
          max={CATEGORIES_AGE_RANGE[1]}
          step={1}
        />
      </KeyboardAvoidingView>

      <PresetButton
        label={`${t.show} ${filterResult?.total ?? ''} ${t.filterResults}`}
        onPress={onShowResults}
        preset={styles.buttonPrimary}
        style={commonStyles.resultsButton}
      />
      <DeleteButton
        label={t.reset}
        onPress={resetGalleryFilter}
        preset={styles.buttonLight}
        iconColor={colors.text}
      />
    </>
  )
}

const commonStyles = StyleSheet.create({
  resultsButton: {
    marginTop: 'auto',
    marginBottom: 12,
  },
  fieldsWrapper: {
    paddingTop: 24,
    marginBottom: 24,
  },
})

export default GalleryFilter
