import { StyleProp, ViewStyle } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { CountryCode } from '../../features/countries'
import { PhoneInputModel } from '../../lib/componentsModels/phoneNumber/model.phoneNumber'
import { InputStyles } from '../input/types'
import {
  DropdownSelectStyles,
  RenderItem,
  StringExtractor,
} from '../selects/types'

export type PhoneInputProps = {
  phoneModel: PhoneInputModel
  label?: string
  disabled?: boolean
  placeholder?: string
  isValid?: boolean
  style?: {
    wrapper?: StyleProp<ViewStyle>
    input?: InputStyles
  }
}

export type CountrySelectablePhoneInputProps<T> = PhoneInputProps & {
  countries: T[]
  renderCountryItem: RenderItem<T>
  countryLabelExtractor: StringExtractor<T>
  selectedCountryModel: StateModel<T>
  countryCodeExtractor: (props: T) => CountryCode
  inputPlaceholder?: string
  selectPlaceholder?: string
  style?: {
    wrapper?: StyleProp<ViewStyle>
    select?: DropdownSelectStyles
    input?: InputStyles
  }
}
