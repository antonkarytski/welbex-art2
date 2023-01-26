import React from 'react'
import { StyleSheet } from 'react-native'
import { createStateModel } from 'altek-toolkit'
import { COUNTRIES_LIST, Country } from '../../features/countries'
import CountryRow from '../../features/countries/CountryRow'
import { createPhoneInputModel } from '../../lib/componentsModels/phoneNumber/model.phoneNumber'
import CountrySelectablePhoneInput from '../../ui/phoneInput/CountrySelectablePhoneInput'
import { CountrySelectablePhoneInputProps } from '../../ui/phoneInput/types'

export const phoneInputModel = createPhoneInputModel()
export const countryModel = createStateModel(COUNTRIES_LIST[0])
const renderCountryRow = (item: Country) => <CountryRow item={item} />

type PhoneEnterProps = {
  label?: string
  isValid?: boolean
  style?: CountrySelectablePhoneInputProps<Country>['style']
}

const PhoneEnter = ({ label, isValid, style }: PhoneEnterProps) => {
  return (
    <CountrySelectablePhoneInput
      label={label}
      phoneModel={phoneInputModel}
      countries={COUNTRIES_LIST}
      renderCountryItem={renderCountryRow}
      selectedCountryModel={countryModel}
      countryCodeExtractor={({ alpha2Code }) => alpha2Code}
      countryLabelExtractor={({ emoji }) => emoji}
      isValid={isValid}
      style={{
        select: { dropdownTab: tabStyles },
        ...style,
      }}
    />
  )
}

const tabStyles = StyleSheet.create({
  tabLabel: { fontSize: 20 },
})

export default PhoneEnter
