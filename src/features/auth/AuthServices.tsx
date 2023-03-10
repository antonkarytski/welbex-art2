import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { api } from '../../api'
import { buttonLightThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import LineSeparator from '../../ui/LineSeparator'
import AppleButton from '../../ui/buttons/Button.Apple'
import GoogleButton from '../../ui/buttons/Button.Google'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'

type AuthWithServicesProps = {
  showLineSeparator?: boolean
  style?: StyleProp<ViewStyle>
}

const AuthWithServices = ({
  showLineSeparator = true,
  style,
}: AuthWithServicesProps) => {
  const t = useText()
  const { styles } = useThemedStyleList({
    feature: themedStyles,
    button: buttonLightThemedPreset,
  })
  const onContinueWithGoogle = () => {
    api.auth.googleAuth().then((e) => {
      console.log(e)
    })
  }
  const onContinueWithApple = () => {}

  return (
    <View style={[style]}>
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
        style={{ button: styles.feature.button }}
        preset={styles.button}
      />
      <AppleButton
        onPress={onContinueWithApple}
        label={t.continueWithApple}
        preset={styles.button}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
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
