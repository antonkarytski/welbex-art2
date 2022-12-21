import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useNavigate } from '../../navigation'
import AppHeader from '../../navigation/elements/AppHeader'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import ScreenWrapper from '../../ui/ScreenWrapper'
import Span from '../../ui/Span'
import TextButton from '../../ui/buttons/Button.Text'
import { themedCommonStyles, themedScreenHeaderStyles } from './styles'

const PhoneEnterScreen = () => {
  const { styles } = useThemedStyleList({
    screenHeader: themedScreenHeaderStyles,
    common: themedCommonStyles,
  })

  return (
    <ScreenWrapper style={styles.common.screenWrapper}>
      <AppHeader style={styles.screenHeader} />
      <Text>Phone enter</Text>
    </ScreenWrapper>
  )
}
export default PhoneEnterScreen
