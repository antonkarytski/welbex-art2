import { sample } from 'effector'
import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { COUNTRIES_LIST, Country } from '../../features/countries'
import CountryRow from '../../features/countries/CountryRow'
import { createPhoneInputModel } from '../../lib/componentsModels/phoneNumber/model.phoneNumber'
import CountrySelectablePhoneInput from '../../ui/phoneInput/CountrySelectablePhoneInput'
import { CountrySelectablePhoneInputProps } from '../../ui/phoneInput/types'
import { RenderItem } from '../../ui/selects/types'
import { createCountryModel } from '../countries/model.countriesDropdown'
import { profileCountryModel } from './model.profileCountry'

export const phoneInputModel = createPhoneInputModel()
export const phoneCountryModel = createCountryModel()

sample({
  clock: profileCountryModel.set,
  source: {
    profileCountry: profileCountryModel.$state,
    country: phoneInputModel.purePhoneModel.$state,
  },
  filter: ({ country }) => !country,
  fn: ({ profileCountry }) => profileCountry,
  target: phoneCountryModel.set,
})

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
      phoneModel={phoneInputModel}
      countries={COUNTRIES_LIST}
      renderCountryItem={renderCountryRow}
      selectedCountryModel={phoneCountryModel}
      countryCodeExtractor={({ alpha2Code }) => alpha2Code}
      countryLabelExtractor={({ emoji }) => emoji}
      isValid={isValid || (isPhoneChecked ? isPhoneValid : undefined)}
      onFocus={() => setIsPhoneChecked(false)}
      onBlur={() => setIsPhoneChecked(true)}
      style={{
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
  tabLabel: {
    fontSize: 20,
    lineHeight: 26,
  },
})

export default PhoneEnter
