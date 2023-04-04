import { useStore } from 'effector-react'
import { KeyboardAvoidingView } from 'native-base'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { CATEGORIES_AGE_RANGE } from '../../../constants/categories'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
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
import CategoriesMultiSelect from '../../categories/CategoriesMultiSelect'
import CountriesDropdownMultiSelect from '../../countries/CountriesDropdownMultiSelect'
import { useThemedStyleList } from '../../themed/hooks'
import { useGallery } from '../hooks'
import { $activeGallery } from '../model'
import { getArtWorksAmountTranslation } from './helpers'
import {
  $galleryFilterProps,
  ageRangeModel,
  categoriesModel,
  countriesModel,
  drawingNameModel,
  resetGalleryFilter,
} from './model'
import { countFilteredGalleryModel, galleriesModeProp } from './request'

const GalleryFilter = () => {
  const t = useText()
  const navigate = useNavigate()
  const { styles, colors } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    input: inputThemedStyles,
  })
  const { type } = useStore($activeGallery)
  const filters = useStore($galleryFilterProps)

  const { getSync: getFilteredArts } = useGallery(type)

  const [drawingName, setDrawingName] = useStateStore(drawingNameModel)
  const filterResult = useStore(countFilteredGalleryModel.$data)

  useEffect(() => {
    countFilteredGalleryModel.get({ ...galleriesModeProp[type], ...filters })
  }, [])

  const onShowResults = () => {
    getFilteredArts(filters)
    navigate(links.specificGalleryFiltered)
  }
  return (
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={commonStyles.fieldsWrapper}
      >
        <CategoriesMultiSelect model={categoriesModel} />
        <CountriesDropdownMultiSelect {...countriesModel} />
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
        label={`${t.show} ${getArtWorksAmountTranslation(
          filterResult?.total,
          t
        )}`}
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
