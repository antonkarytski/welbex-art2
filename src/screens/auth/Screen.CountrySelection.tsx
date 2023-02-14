import { useStoreMap } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import CountriesList from '../../features/signUp/country/CountriesList'
import { userCountrySignUpModel } from '../../features/signUp/country/model'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const CountrySelectionScreen = () => {
  const navigate = useNavigate()
  const t = useText()
  const isCountrySelected = useStoreMap({
    store: userCountrySignUpModel.$state,
    keys: [],
    fn: (state) => !!state,
  })
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const onContinue = () => {
    navigate(links.phoneEnter)
  }

  return (
    <AuthScreenContainer>
      <H2 label={t.chooseCountry} style={styles.common.title} />
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <CountriesList />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.continue}
        onPress={onContinue}
        preset={styles.button}
        style={styles.common.bottomButton}
        disabled={!isCountrySelected}
      />
    </AuthScreenContainer>
  )
}

export default CountrySelectionScreen
