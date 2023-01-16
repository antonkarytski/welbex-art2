import { useEvent } from 'effector-react'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import DropdownSelect from '../selects/DropdownSelect'
import PhoneInput from './PhoneInput'
import { CountrySelectablePhoneInputProps } from './types'

const CountrySelectablePhoneInput = <CountryItem extends Record<string, any>>({
  label,
  phoneModel,
  countries,
  renderCountryItem,
  selectedCountryModel,
  countryLabelExtractor,
  countryCodeExtractor,
  style,
  disabled,
  inputPlaceholder,
  selectPlaceholder,
  isValid,
}: CountrySelectablePhoneInputProps<CountryItem>) => {
  const [selectedCountry] = useStateStore(selectedCountryModel)

  const setCountryCode = useEvent(phoneModel.countryCodeModel.set)

  useEffect(() => {
    setCountryCode(countryCodeExtractor(selectedCountry))
  }, [selectedCountry, countryCodeExtractor, setCountryCode])

  return (
    <View style={[styles.wrapper, style?.wrapper]}>
      <DropdownSelect
        data={countries}
        renderItem={renderCountryItem}
        model={selectedCountryModel}
        labelExtractor={countryLabelExtractor}
        idExtractor={countryCodeExtractor}
        placeholder={selectPlaceholder}
        style={{
          dropdownTab: {
            ...dropdownTabStyles,
            ...style?.select?.dropdownTab,
          },
          select: style?.select?.select,
        }}
      />
      <PhoneInput
        label={label}
        phoneModel={phoneModel}
        disabled={disabled}
        placeholder={inputPlaceholder}
        style={{ wrapper: styles.phoneInputWrapper }}
        isValid={isValid}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  phoneInputWrapper: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flexGrow: 1,
  },
})

const dropdownTabStyles = StyleSheet.create({
  wrapper: {
    width: '25%',
    flexGrow: 0,
  },
  tab: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 10,
  },
  dropdownContainer: {
    flexGrow: 1,
    minWidth: 250,
    width: '90%',
  },
})

export default CountrySelectablePhoneInput
