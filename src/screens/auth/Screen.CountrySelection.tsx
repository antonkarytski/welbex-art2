import { useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { profileCountryModel } from '../../features/auth/model.profileCountry'
import CountryRow from '../../features/countries/CountryRow'
import { COUNTRIES_LIST } from '../../features/countries/countriesList'
import { countyNameExtractor } from '../../features/countries/helpers'
import { Country } from '../../features/countries/types'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createSearchableListModel } from '../../lib/componentsModels/model.search'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PresetButton from '../../ui/buttons/PresetButton'
import ListSelect from '../../ui/selects/ListSelect'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const searchModel = createSearchableListModel<Country>({
  filterExtractor: countyNameExtractor,
})
const countryIdExtractor = ({ alpha3Code }: Country) => alpha3Code

const renderCountryRow = (item: Country) => <CountryRow item={item} />

const CountrySelectionScreen = () => {
  const navigate = useNavigate()
  const t = useText()
  const country = useStore(profileCountryModel.$state)
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const onContinue = () => {
    console.log('countryId', country.alpha3Code)
    navigate(links.phoneEnter)
  }

  return (
    <AuthScreenContainer>
      <H2 label={t.chooseCountry} style={styles.common.title} />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.flexGrown}
      >
        <ListSelect
          data={COUNTRIES_LIST}
          idExtractor={countryIdExtractor}
          searchModel={searchModel}
          model={profileCountryModel}
          renderItem={renderCountryRow}
        />
        <PresetButton
          label={t.continue}
          onPress={onContinue}
          preset={styles.button}
          style={styles.common.bottomButton}
          disabled={!country}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}

export default CountrySelectionScreen
