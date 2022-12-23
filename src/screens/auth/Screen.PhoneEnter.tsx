import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import TextButton from '../../ui/buttons/Button.Text'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'

const PhoneEnterScreen = () => {
  return (
    <AuthScreenContainer>
      <Text>Phone enter</Text>
    </AuthScreenContainer>
  )
}
export default PhoneEnterScreen
