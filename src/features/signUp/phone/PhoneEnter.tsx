import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import CountrySelectablePhoneInput from '../../../ui/phoneInput/CountrySelectablePhoneInput'
import { CountrySelectablePhoneInputProps } from '../../../ui/phoneInput/types'
import { RenderItem } from '../../../ui/selects/types'
import { COUNTRIES_LIST, Country } from '../../countries'
import CountryRow from '../../countries/CountryRow'
import { phoneCountryModel, phoneInputModel } from './model'

const renderCountryRow: RenderItem<Country> = (item, isSelected) => (
  <CountryRow item={item} isSelected={isSelected} />
)

type PhoneEnterProps = {
  label?: string
  isValid?: boolean
  style?: CountrySelectablePhoneInputProps<Country>['style']
}

const PhoneEnter = ({ label, isValid, style }: PhoneEnterProps) => {
  const isPhoneValid = useStore(phoneInputModel.$isPhoneValid)
  const [isPhoneChecked, setIsPhoneChecked] = useState(false)

  const dropdownTabStyle = style?.select?.dropdownTab
  const dropdownTabLabelStyle = {
    ...styles.tabLabel,
    ...dropdownTabStyle?.tabLabel,
  }

  return (
    <CountrySelectablePhoneInput
      label={label}
      selectedCountryModel={phoneCountryModel}
      phoneModel={phoneInputModel}
      countries={COUNTRIES_LIST}
      renderCountryItem={renderCountryRow}
      countryCodeExtractor={({ alpha2Code }) => alpha2Code}
      countryLabelExtractor={({ emoji }) => emoji}
      isValid={isValid || (isPhoneChecked ? isPhoneValid : undefined)}
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

export default PhoneEnter