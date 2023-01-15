import React, { useCallback, useMemo } from 'react'
import { Image, Text, View } from 'react-native'
import GreetingSlider from '../../../features/auth/greetingSlider/GreetingSlider'
import { useThemedStyleList } from '../../../features/themed/hooks'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import PresetButton from '../../../ui/buttons/PresetButton'
import AuthScreenContainer from '../stylePresets/AuthScreenContainer'
import { themedGreetingsStyles } from './styles'

const ViewDrawingsScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedGreetingsStyles,
    button: buttonPrimaryThemedPreset,
  })
  const onSnapToItem = () => {}
  return (
    <AuthScreenContainer>
      <GreetingSlider onSnapToItem={onSnapToItem} style={styles.common} />

      <PresetButton
        label={t.next}
        onPress={onSnapToItem}
        preset={styles.button}
        style={styles.common.button}
      />
    </AuthScreenContainer>
  )
}

export default ViewDrawingsScreen
