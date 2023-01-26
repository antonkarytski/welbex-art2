import { useEvent } from 'effector-react'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
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
    <View style={style?.wrapper}>
      {label && (
        <Span label={label} style={[styles.label, style?.input?.label]} />
      )}
      <View style={[styles.innerWrapper, style?.innerWrapper]}>
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
          phoneModel={phoneModel}
          disabled={disabled}
          placeholder={inputPlaceholder}
          style={{ wrapper: styles.phoneInputWrapper, input: style?.input }}
          isValid={isValid}
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
