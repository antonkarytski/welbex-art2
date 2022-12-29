import { useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import COUNTRIES from '../../../assets/countries.json'
import CountryRow from '../../features/countries/CountryRow'
import { Country } from '../../features/countries/types'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createSearchableListModel } from '../../lib/componentsModels/model.search'
import { createSelectModel } from '../../lib/componentsModels/model.select'
import { IS_IOS } from '../../lib/platform'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PresetButton from '../../ui/buttons/PresetButton'
import ListSelect from '../../ui/listSelect/ListSelect'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const countryModel = createSelectModel()

const searchModel = createSearchableListModel<Country>({
  filterExtractor: (item) => item.name + ' ' + item.nativeName,
})

const CountrySelectionScreen = () => {
  const navigate = useNavigate()
  const t = useText()
  const countryId = useStore(countryModel.$state)
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const onContinue = () => {
    console.log('countryId', countryId)
    navigate(links.phoneEnter)
  }

  return (
    <AuthScreenContainer>
      <H2 label={t.chooseCountry} style={styles.common.title} />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={[styles.common.flexGrown]}
      >
        <ListSelect<Country>
          data={COUNTRIES}
          idExtractorName={'alpha3Code'}
          searchModel={searchModel}
          selectModel={countryModel}
          renderItem={(item) => <CountryRow item={item} />}
        />
        <PresetButton
          label={t.continue}
          onPress={onContinue}
          preset={styles.button}
          style={[styles.common.bottomButton]}
          disabled={!countryId}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}

export default CountrySelectionScreen
