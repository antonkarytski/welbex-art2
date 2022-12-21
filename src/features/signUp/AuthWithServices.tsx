import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IS_IOS } from '../../lib/platform'
import { useText } from '../../translations/hook'
import FlexRow from '../../ui/FlexRow'
import Span from '../../ui/Span'
import Button from '../../ui/buttons/PresetButton'
import AppleIcon from '../../ui/icons/Icon.Apple'
import GoogleIcon from '../../ui/icons/Icon.Google'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'

const AuthWithServices = () => {
  const t = useText()
  const styles = useThemedStyle(themedStyles)
  const onContinueWithGoogle = () => {}
  const onContinueWithApple = () => {}

  const GoogleButtonInner = () => (
    <FlexRow>
      <GoogleIcon size={24} style={styles.buttonIcon} />
      <Span label={t.continueWithGoogle} />
    </FlexRow>
  )

  const AppleButtonInner = () => (
    <FlexRow>
      <AppleIcon size={20} style={styles.buttonIcon} />
      <Span label={t.continueWithApple} />
    </FlexRow>
  )

  return (
    <View style={styles.container}>
      <FlexRow style={styles.orLineWrapper}>
        <View style={styles.line} />
        <Span style={[styles.text, styles.orText]}>or</Span>
        <View style={styles.line} />
      </FlexRow>
      <Button
        label={t.continueWithGoogle}
        onPress={onContinueWithGoogle}
        style={styles.button}
      >
        {GoogleButtonInner}
      </Button>
      <Button
        label={t.continueWithApple}
        onPress={onContinueWithApple}
        style={[styles.lastButton]}
      >
        {AppleButtonInner}
      </Button>
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
    orLineWrapper: {
      marginVertical: 35,
    },
    orText: {
      paddingHorizontal: 16,
    },
    line: {
      height: 1,
      flexGrow: 1,
      backgroundColor: colors.textLight,
    },
    button: {
      marginBottom: 12,
    },
    lastButton: {
      marginBottom: 0,
    },
    buttonIcon: {
      marginRight: 12,
    },
  })
)

export default AuthWithServices
