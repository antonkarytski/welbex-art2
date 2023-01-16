import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet } from 'react-native'
import OnboardingSlider from '../../../features/auth/onboardingSlider/OnboardingSlider'
import { $isLastSlideActive } from '../../../features/auth/onboardingSlider/model.onboardingSlider'
import { createThemedStyle } from '../../../features/themed'
import { useThemedStyleList } from '../../../features/themed/hooks'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import ArrowButton from '../../../ui/buttons/Button.Arrow'
import AuthScreenContainer from '../stylePresets/AuthScreenContainer'
import { themedGreetingsStyles } from './styles'

const ViewDrawingsScreen = () => {
  const t = useText()
  const navigate = useNavigate()
  const isLastSlideActive = useStore($isLastSlideActive)

  const { styles, colors } = useThemedStyleList({
    common: themedGreetingsStyles,
    button: buttonPrimaryThemedPreset,
    screen: themedStyles,
  })

  return (
    <AuthScreenContainer>
      <OnboardingSlider style={{ ...styles.common, button: styles.button }} />

      {isLastSlideActive && (
        <ArrowButton
          label={t.skipForNow}
          onPress={() => {
            navigate(links.login)
          }}
          fontWeight={500}
          iconColor={colors.textLightGrey}
          iconSize={20}
          style={{ label: styles.screen.skipText }}
        />
      )}
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

export default ViewDrawingsScreen
