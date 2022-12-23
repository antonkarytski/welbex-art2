import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import Button from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const CountrySelectionScreen = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
  })

  const onGoToPhoneNumberScreen = () => {
    navigate(links.phoneEnter)
  }

  return (
    <AuthScreenContainer>
      <Span
        style={{ marginVertical: 20 }} // TEST
        label={'Choose country screen'}
      />
      <Button
        label={'Go to sign up screen'} // TEST
        onPress={() => navigate(links.signUp)}
        style={{ marginVertical: 20 }}
      />
      {/* <Button label={t.continue} onPress={onGoToPhoneNumberScreen} /> */}
    </AuthScreenContainer>
  )
}

export default CountrySelectionScreen
