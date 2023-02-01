import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

export default function DeleteAccountScreen() {
  const t = useText()
  const { styles } = useThemedStyleList({
    button: buttonPrimaryThemedPreset,
    common: themedCommonStyles,
    screen: screenStyles,
  })
  const onDeleteAccount = () => {}

  return (
    <SettingScreenContainer title={t.deleteAccount} enableScrollView>
      <View style={styles.common.flexGrown}>
        <Span
          label={t.deleteAccountWarn}
          style={styles.screen.deleteAccountWarn}
          weight={500}
        />
        <Span
          label={t.deleteAccountDescription}
          style={styles.screen.descriptionText}
          weight={400}
        />
        <PresetButton
          label={t.delete}
          onPress={onDeleteAccount}
          preset={styles.button}
          style={styles.common.bottomButton}
        />
      </View>
    </SettingScreenContainer>
  )
}

const screenStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    deleteAccountWarn: {
      marginTop: 24,
      marginBottom: 8,
      color: colors.text,
      fontSize: 16,
      lineHeight: 20,
    },
    descriptionText: {
      marginBottom: 10,
      color: colors.textGrey,
      fontSize: 14,
      lineHeight: 21,
    },
  })
)
