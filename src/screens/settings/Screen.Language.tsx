import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyle } from '../../features/themed/hooks'
import { useText } from '../../translations/hook'
import {
  LANGUAGES_DESCRIPTOR,
  languageModel,
} from '../../translations/model.languages'
import { Languages } from '../../translations/types'
import ListItemSeparator from '../../ui/ListItemSeparator'
import Span from '../../ui/Span'
import Select from '../../ui/selects/Select'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function LanguageScreen() {
  const t = useText()
  const styles = useThemedStyle(themedStyles)

  const renderItem = useCallback(
    (languageKey: Languages) => (
      <Span
        label={t[LANGUAGES_DESCRIPTOR[languageKey]]}
        style={styles.languageLabel}
        weight={500}
      />
    ),
    [styles, t]
  )

  return (
    <SettingScreenContainer title={t.language}>
      <Select
        data={Object.values(Languages)}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeparator}
        idExtractor={(key) => key}
        model={languageModel}
        ListFooterComponent={ListItemSeparator}
      />
    </SettingScreenContainer>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    languageLabel: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 21,
    },
  })
)
