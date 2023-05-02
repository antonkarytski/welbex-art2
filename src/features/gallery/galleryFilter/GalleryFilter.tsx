import { useStore } from 'effector-react'
import { KeyboardAvoidingView } from 'native-base'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
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
import CountriesDropdownMultiSelect from '../../countries/CountriesDropdownMultiSelect'
import AgeMultiSelect from '../../filters/AgeMultiSelect'
import CategoriesMultiSelect from '../../filters/CategoriesMultiSelect'
import DrawingNameFilter from '../../filters/DrawingNameFilter'
import { useThemedStyleList } from '../../themed/hooks'
import { useGallery } from '../hooks'
import { $activeGallery } from '../model'
import { getArtWorksAmountTranslation } from './helpers'
import {
  $galleryFilterProps,
  agesCategoriesModel,
  categoriesModel,
  countriesModel,
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
        <DrawingNameFilter styles={styles.input} />
        <AgeMultiSelect model={agesCategoriesModel} />
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
