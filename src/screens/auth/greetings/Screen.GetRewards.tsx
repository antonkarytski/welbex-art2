import React, { useCallback, useMemo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { createThemedStyle } from '../../../features/themed'
import {
  useThemeColors,
  useThemedStyleList,
} from '../../../features/themed/hooks'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import ArrowButton from '../../../ui/buttons/Button.Arrow'
import PresetButton from '../../../ui/buttons/PresetButton'
import AuthScreenContainer from '../stylePresets/AuthScreenContainer'
import { themedGreetingsStyles } from './styles'

const GetRewardsScreen = () => {
  const t = useText()
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    common: themedGreetingsStyles,
    button: buttonPrimaryThemedPreset,
    screen: themedStyles,
  })
  const themedColors = useThemeColors()

  return (
    <AuthScreenContainer>
      <PresetButton
        label={t.createAccountButton}
        onPress={() => {
          navigate(links.signUp)
        }}
        preset={styles.button}
        style={[styles.common.button, styles.screen.nextButton]}
      />
      <ArrowButton
        label={t.skipForNow}
        onPress={() => {
          navigate(links.login)
        }}
        fontWeight={500}
        iconColor={themedColors.textLightGrey}
        iconSize={20}
        style={{ label: styles.screen.skipText }}
      />
    </AuthScreenContainer>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    nextButton: {
      marginBottom: 14,
    },
    skipText: {
      color: colors.textLightGrey,
      fontSize: 16,
      lineHeight: 21,
    },
  })
)

export default GetRewardsScreen
