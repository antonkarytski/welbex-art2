import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInputProps, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { defaultColors } from '../../features/themed/theme'
import Span from '../Span'
import DropdownSelect from '../selects/DropdownSelect'
import PhoneInput from './PhoneInput'
import { CountrySelectablePhoneInputProps } from './types'

const CountrySelectablePhoneInput = <CountryItem extends Record<string, any>>({
  label,
  phoneModel,
  countries,
  searchModel,
  renderCountryItem,
  selectedCountryModel,
  countryLabelExtractor,
  countryCodeExtractor,
  style,
  disabled,
  inputPlaceholder,
  selectPlaceholder,
  isValid,
  onBlur,
  onFocus,
}: CountrySelectablePhoneInputProps<CountryItem>) => {
  const [isFocused, setIsFocused] = useState(false)
  const [selectedCountry] = useStateStore(selectedCountryModel)

  useEffect(() => {
    phoneModel.countryCodeModel.set(countryCodeExtractor(selectedCountry))
  }, [selectedCountry, countryCodeExtractor, phoneModel])

  const handleBlur: TextInputProps['onBlur'] = (e) => {
    setIsFocused(false)
    onBlur?.(e)
  }
  const handleFocus: TextInputProps['onFocus'] = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  return (
    <View style={style?.wrapper}>
      {label && (
        <Span label={label} style={[styles.label, style?.input?.label]} />
      )}
      <View style={[styles.innerWrapper, style?.innerWrapper]}>
        <DropdownSelect
          searchModel={searchModel}
          data={countries}
          renderItem={renderCountryItem}
          model={selectedCountryModel}
          labelExtractor={countryLabelExtractor}
          idExtractor={countryCodeExtractor}
          placeholder={selectPlaceholder}
          onOpenDropdown={() => setIsFocused(true)}
          style={{
            dropdownTab: {
              ...dropdownTabStyles,
              ...style?.select?.dropdownTab,
              tab: [dropdownTabStyles.tab, isFocused && styles.tab__focused],
            },
            select: style?.select?.select,
          }}
        />
        <PhoneInput
          phoneModel={phoneModel}
          disabled={disabled}
          placeholder={inputPlaceholder}
          style={{
            wrapper: styles.phoneInputWrapper,
            input: {
              ...style?.input,
              container: {
                ...styles.inputContainer,
                ...style?.input?.container,
              },
            },
          }}
          isValid={isValid}
          onBlur={handleBlur}
          onFocus={handleFocus}
          focused={isFocused}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  innerWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  label: {
    marginBottom: 8,
    color: defaultColors.textGrey,
    fontSize: 14,
  },
  phoneInputWrapper: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flexGrow: 1,
  },
  inputContainer: {
    flex: 1,
  },
  tab__focused: {
    borderColor: defaultColors.detailsActive,
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    flexGrow: 1,
    minWidth: 250,
    width: '90%',
  },
})

export default CountrySelectablePhoneInput
