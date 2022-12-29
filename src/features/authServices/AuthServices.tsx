import React from 'react'
import { StyleSheet, View } from 'react-native'
import { buttonLightThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import LineSeparator from '../../ui/LineSeparator'
import AppleButton from '../../ui/buttons/Button.Apple'
import GoogleButton from '../../ui/buttons/Button.Google'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'

type AuthWithServicesProps = {
  showLineSeparator?: boolean
}

const AuthWithServices = ({
  showLineSeparator = true,
}: AuthWithServicesProps) => {
  const t = useText()
  const { styles } = useThemedStyleList({
    feature: themedStyles,
    button: buttonLightThemedPreset,
  })
  const onContinueWithGoogle = () => {}
  const onContinueWithApple = () => {}

  return (
    <View style={styles.feature.container}>
      {showLineSeparator && (
        <LineSeparator
          label={t.or}
          style={styles.feature.separatorLineWrapper}
          styleLabel={styles.feature.text}
          styleLine={styles.feature.separatorLine}
        />
      )}
      <GoogleButton
        label={t.continueWithGoogle}
        onPress={onContinueWithGoogle}
        style={styles.feature.button}
        preset={styles.button}
      />
      <AppleButton
        onPress={onContinueWithApple}
        label={t.continueWithApple}
        style={[styles.feature.lastButton]}
        preset={styles.button}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    text: {
      color: colors.textLightGrey,
    },
    separatorLineWrapper: {
      marginVertical: 35,
    },
    separatorLine: {
      backgroundColor: colors.textLightGrey,
    },
    button: {
      marginBottom: 12,
    },
    lastButton: {
      marginBottom: 0,
    },
  })
)

export default AuthWithServices
