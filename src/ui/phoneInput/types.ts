import React from 'react'
import { StyleProp, TextInput, TextInputProps, ViewStyle } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { CountryCode } from '../../features/countries'
import { SearchableListModel } from '../../lib/models/model.search'
import { PhoneInputModel } from '../../lib/models/phoneNumber/model.phoneNumber'
import { InputStyles } from '../input/types'
import { RenderItem } from '../selects/selectItem/types'
import {
  DropdownSelectPreset,
  DropdownSelectStyles,
  StringExtractor,
} from '../selects/types'

export type PhoneInputProps = {
  phoneModel: PhoneInputModel
  label?: string
  disabled?: boolean
  placeholder?: string
  isValid?: boolean
  ref?: React.RefObject<TextInput>
  focused?: boolean
  onBlur?: TextInputProps['onBlur']
  onFocus?: TextInputProps['onFocus']
  style?: {
    wrapper?: StyleProp<ViewStyle>
    input?: InputStyles
  }
}

export type CountrySelectablePhoneInputProps<T> = PhoneInputProps & {
  searchModel: SearchableListModel<T>
  countries: T[]
  renderCountryItem: RenderItem<T>
  countryLabelExtractor: StringExtractor<T>
  countryModel: StateModel<T | null>
  countryCodeExtractor: (props: T) => CountryCode
  inputPlaceholder?: string
  selectPlaceholder?: string
  style?: {
    wrapper?: StyleProp<ViewStyle>
    innerWrapper?: StyleProp<ViewStyle>
    select?: DropdownSelectStyles
    input?: InputStyles
  }
  preset?: DropdownSelectPreset
}
