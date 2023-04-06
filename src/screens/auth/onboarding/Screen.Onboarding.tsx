import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import OnboardingSlider, {
  OnboardingSliderStyles,
} from '../../../features/onboarding/OnboardingSlider'
import { onBoardingWasShownModel } from '../../../features/onboarding/model'
import { $isLastSlideActive } from '../../../features/onboarding/model.onboardingSlider'
import { createThemedStyle } from '../../../features/themed'
import { useThemedStyleList } from '../../../features/themed/hooks'
import { WINDOW_HEIGHT } from '../../../lib/device/dimensions'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import ArrowButton from '../../../ui/buttons/Button.Arrow'
import AuthScreenContainer from '../stylePresets/AuthScreenContainer'
import { themedGreetingsStyles } from './styles'

const OnboardingScreen = () => {
  const t = useText()
  const navigate = useNavigate()
  const isLastSlideActive = useStore($isLastSlideActive)

  const { styles, colors } = useThemedStyleList({
    common: themedGreetingsStyles,
    button: buttonPrimaryThemedPreset,
    screen: themedStyles,
  })

  useEffect(() => {
    onBoardingWasShownModel.set()
  }, [])

  return (
    <AuthScreenContainer
      enableScrollView
      style={{
        container: { paddingHorizontal: 0 },
        screenWrapper: { height: WINDOW_HEIGHT },
      }}
    >
      <OnboardingSlider
        style={
          { ...styles.common, button: styles.button } as OnboardingSliderStyles
        }
      />

      <View style={styles.screen.skipButtonWrapper}>
        {isLastSlideActive && (
          <ArrowButton
            label={t.skipForNow}
            onPress={() => {
              navigate(links.mainTabs)
            }}
            fontWeight={500}
            iconColor={colors.textLightGrey}
            iconSize={20}
            style={{ label: styles.screen.skipText }}
          />
        )}
      </View>
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
    skipButtonWrapper: {
      paddingHorizontal: 20,
    },
  })
)

export default OnboardingScreen
