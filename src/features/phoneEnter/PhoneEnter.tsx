import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useDropdownSelectPreset } from '../../styles/selects'
import CountrySelectablePhoneInput from '../../ui/phoneInput/CountrySelectablePhoneInput'
import { RenderItem } from '../../ui/selects/selectItem/types'
import { COUNTRIES_LIST, Country } from '../countries'
import CountryRow from '../countries/CountryRow'
import { PhoneEnterProps } from './types'
import { IS_ANDROID } from "../../lib/helpers/native/constants";

const renderCountryRow: RenderItem<Country> = (item, isSelected) => (
  <CountryRow item={item} isSelected={isSelected} style={itemStyles} />
)

const PhoneEnter = ({ label, style, model }: PhoneEnterProps) => {
  const { phoneInputModel, searchCountryModel, phoneCountryModel } = model
  const isPhoneValid = useStore(phoneInputModel.$isPhoneValid)
  const [isPhoneChecked, setIsPhoneChecked] = useState(false)
  const selectStylesPreset = useDropdownSelectPreset()
  const dropdownTabStyle = style?.select?.dropdownTab
  const dropdownTabLabelStyle = {
    ...styles.tabLabel,
    ...dropdownTabStyle?.tabLabel,
  }

  return (
    <CountrySelectablePhoneInput
      searchModel={searchCountryModel}
      label={label}
      countryModel={phoneCountryModel}
      phoneModel={phoneInputModel}
      countries={COUNTRIES_LIST}
      renderCountryItem={renderCountryRow}
      countryCodeExtractor={({ alpha2Code }) => alpha2Code}
      countryLabelExtractor={({ emoji }) => emoji}
      isValid={isPhoneChecked ? isPhoneValid : undefined}
      onFocus={() => setIsPhoneChecked(false)}
      onBlur={() => setIsPhoneChecked(true)}
      style={{
        ...styles,
        ...style,
        select: {
          ...style?.select,
          dropdownTab: {
            ...dropdownTabStyle,
            tabLabel: dropdownTabLabelStyle,
          },
        },
      }}
      preset={selectStylesPreset}
    />
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  tabLabel: {
    fontSize: 20,
    lineHeight: 26,
  },
})

const itemStyles = StyleSheet.create({
  text: {
    color: IS_ANDROID ? '#000' : undefined,
  },
})

export default PhoneEnter
