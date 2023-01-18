import React from 'react'
import { StyleSheet, View } from 'react-native'
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
  })
  const onDeleteAccount = () => {}

  return (
    <SettingScreenContainer title={t.deleteAccount}>
      <View style={styles.common.flexGrown}>
        <Span
          label={t.deleteAccountWarn}
          style={[screenStyles.deleteAccountWarn]}
        />
        <Span
          label={t.deleteAccountDescription}
          style={[screenStyles.descriptionText]}
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

const screenStyles = StyleSheet.create({
  deleteAccountWarn: {
    marginTop: 24,
    marginBottom: 8,
  },
  descriptionText: {
    marginBottom: 10,
  },
})
