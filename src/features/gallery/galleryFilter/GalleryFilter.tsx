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
import { InputStyles } from '../../../ui/input/types'
import { DropdownSelectStyles } from '../../../ui/selects/types'
import CountriesDropdownMultiSelect from '../../countries/CountriesDropdownMultiSelect'
import AgeMultiSelect from '../../filters/AgeMultiSelect'
import CategoriesMultiSelect from '../../filters/CategoriesMultiSelect'
import DrawingNameFilter from '../../filters/DrawingNameFilter'
import OnlyWinnersFilter, {
  CheckBoxFieldStyles,
} from '../../filters/OnlyWinnersFilter'
import MonthPickerFilter, {
  MonthPickerStyles,
} from '../../filters/monthPicker/MonthPickerFilter'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import { useMergedStyles } from '../../themed/hooks.merge'
import { useGallery } from '../hooks'
import { $activeGallery } from '../model'
import { getArtWorksAmountTranslation } from './helpers'
import {
  $galleryFilterProps,
  agesCategoriesFilterModel,
  categoriesFilterModel,
  countriesFilterModel,
  maxDateFilterModel,
  minDateFilterModel,
  onlyWinnersFilterModel,
  resetGalleryFilter,
} from './model'
import { countFilteredGalleryModel, galleriesModeProp } from './request'

type GalleryFilterProps = {
  resultPageTitle?: string
}

const GalleryFilter = ({ resultPageTitle }: GalleryFilterProps) => {
  const t = useText()
  const navigate = useNavigate()
  const { styles, colors } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    input: inputThemedStyles,
    checkBox: checkBoxThemedStyles,
    monthPicker: monthPickerStyles,
  })
  const inputStyles = useMergedStyles([styles.input, inputCommonStyles])
  const { type } = useStore($activeGallery)
  const filters = useStore($galleryFilterProps)

  const { getSync: getFilteredArts } = useGallery(type)

  const filterResult = useStore(countFilteredGalleryModel.$data)

  useEffect(() => {
    countFilteredGalleryModel.get({ ...galleriesModeProp[type], ...filters })
  }, [])

  const onShowResults = () => {
    getFilteredArts(filters)
    navigate(links.specificGalleryFiltered, { resultPageTitle })
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'position' : 'height'}
        style={commonStyles.fieldsWrapper}
      >
        <CategoriesMultiSelect
          style={dropdownsCommonStyles}
          model={categoriesFilterModel}
        />
        <CountriesDropdownMultiSelect {...countriesFilterModel} />
        <DrawingNameFilter styles={inputStyles} />
        <AgeMultiSelect
          style={dropdownsCommonStyles}
          model={agesCategoriesFilterModel}
        />
        <OnlyWinnersFilter
          style={styles.checkBox}
          model={onlyWinnersFilterModel}
        />
        <MonthPickerFilter
          minValueModel={minDateFilterModel}
          maxValueModel={maxDateFilterModel}
          style={styles.monthPicker}
          inputStyle={styles.input}
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

const checkBoxThemedStyles = createThemedStyle<CheckBoxFieldStyles>((colors) =>
  StyleSheet.create({
    title: {
      fontSize: 14,
      color: colors.inputTitle,
    },
    label: {
      color: colors.text,
    },
    container: {
      marginBottom: 20,
    },
  })
)

const monthPickerStyles = createThemedStyle<MonthPickerStyles>((colors) =>
  StyleSheet.create({
    title: {
      color: colors.inputTitle,
      fontSize: 14,
    },
  })
)

const commonStyles = StyleSheet.create({
  resultsButton: {
    marginBottom: 12,
    marginTop: 53,
  },
  fieldsWrapper: {
    paddingTop: 24,
  },
})

const dropdownsCommonStyles: DropdownSelectStyles = {
  dropdownTab: StyleSheet.create({
    wrapper: {
      marginBottom: 20,
    },
  }),
}

const inputCommonStyles = StyleSheet.create<InputStyles>({
  container: {
    marginBottom: 20,
  },
  wrapper: {
    marginBottom: 0,
  },
})

export default GalleryFilter
