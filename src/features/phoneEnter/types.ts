import { StateModel } from 'altek-toolkit'
import { SearchableListModel } from '../../lib/models/model.search'
import { PhoneInputModel } from '../../lib/models/phoneNumber/model.phoneNumber'
import { CountrySelectablePhoneInputProps } from '../../ui/phoneInput/types'
import { Country } from '../countries'

export type PhoneEnterProps = {
  model: {
    phoneInputModel: PhoneInputModel
    phoneCountryModel: StateModel<Country | null>
    searchCountryModel: SearchableListModel<Country>
  }
  label?: string
  style?: CountrySelectablePhoneInputProps<Country>['style']
}
