import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonLightThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import LineSeparator from '../../ui/LineSeparator'
import AppleButton from '../../ui/buttons/Button.Apple'
import GoogleButton from '../../ui/buttons/Button.Google'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { authWithApple, authWithGoogle } from './quick/services'

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
        onPress={authWithGoogle}
        style={{ button: styles.feature.button }}
        preset={styles.button}
      />
      {IS_IOS && (
        <AppleButton
          onPress={authWithApple}
          label={t.continueWithApple}
          preset={styles.button}
        />
      )}
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
  })
)

export default AuthWithServices
