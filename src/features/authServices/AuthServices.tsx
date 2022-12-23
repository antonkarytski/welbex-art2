import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IS_IOS } from '../../lib/platform'
import { useText } from '../../translations/hook'
import LineSeparator from '../../ui/LineSeparator'
import AppleButton from '../../ui/buttons/Button.Apple'
import GoogleButton from '../../ui/buttons/Button.Google'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'

const AuthWithServices = () => {
  const t = useText()
  const styles = useThemedStyle(themedStyles)
  const onContinueWithGoogle = () => {}
  const onContinueWithApple = () => {}

  return (
    <View style={styles.container}>
      <LineSeparator
        label={t.or}
        style={styles.separatorLineWrapper}
        styleLabel={styles.text}
        styleLine={styles.separatorLine}
      />
      <GoogleButton
        label={t.continueWithGoogle}
        onPress={onContinueWithGoogle}
        style={styles.button}
      />
      <AppleButton
        onPress={onContinueWithApple}
        label={t.continueWithApple}
        style={[styles.lastButton]}
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
      color: colors.textLight,
    },
    separatorLineWrapper: {
      marginVertical: 35,
    },
    separatorLine: {
      backgroundColor: colors.textLight,
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
