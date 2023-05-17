import { useRequest } from '@heyheyjude/toolkit'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { api } from '../../api'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { noop } from '../../lib/helpers'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import AsyncPresetButton from '../../ui/buttons/AsyncPresetButton'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

export default function DeleteAccountScreen() {
  const t = useText()
  const navigate = useNavigate()
  const { styles, colors } = useThemedStyleList({
    button: buttonPrimaryThemedPreset,
    common: themedCommonStyles,
    screen: screenStyles,
  })

  const deleteAccount = useRequest(api.users.deleteMe)

  const onDeleteAccount = () => {
    deleteAccount
      .request()
      .then(() => navigate(links.onboardingPicassoQuote))
      .catch(noop)
  }

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
        <AsyncPresetButton
          isLoading={deleteAccount.isLoading}
          label={t.delete}
          onPress={onDeleteAccount}
          preset={styles.button}
          style={styles.common.bottomButton}
          loaderColor={colors.whiteText}
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
