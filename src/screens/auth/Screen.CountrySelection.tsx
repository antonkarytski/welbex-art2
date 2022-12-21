import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyle, useThemedStyleList } from '../../features/themed/hooks'
import { useNavigate } from '../../navigation'
import AppHeader from '../../navigation/elements/AppHeader'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import ScreenWrapper from '../../ui/ScreenWrapper'
import Span from '../../ui/Span'
import Button from '../../ui/buttons/Button.Big'
import { themedCommonStyles, themedScreenHeaderStyles } from './styles'

const CountrySelectionScreen = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    screenHeader: themedScreenHeaderStyles,
    common: themedCommonStyles,
  })

  const onGoToPhoneNumberScreen = () => {
    navigate(links.phoneEnter)
  }

  return (
    <ScreenWrapper style={styles.common.screenWrapper}>
      <AppHeader style={styles.screenHeader} />
      <Span style={{ marginVertical: 20 }}>Choose country screen</Span>
      <Button
        label={'Go to sign up screen'}
        onPress={() => navigate(links.signUp)}
        style={{ marginVertical: 20 }}
      />
      {/* <Button label={t.continue} onPress={onGoToPhoneNumberScreen} /> */}
    </ScreenWrapper>
  )
}

export default CountrySelectionScreen
