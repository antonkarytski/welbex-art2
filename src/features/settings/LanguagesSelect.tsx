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
import Span from '../../ui/Span'
import ListItemSeparator from '../../ui/lists/ListItemSeparator'
import Select from '../../ui/selects/Select'

const LanguagesSelect = () => {
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
    <Select
      data={Object.values(Languages)}
      renderItem={renderItem}
      ItemSeparatorComponent={ListItemSeparator}
      idExtractor={(key) => key}
      model={languageModel}
      ListFooterComponent={ListItemSeparator}
      style={selectStyles}
    />
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

const selectItemStyles = StyleSheet.create({
  icon_checkMark__wrapper: {
    right: -40,
  },
})

const selectStyles = {
  item: selectItemStyles,
}

export default LanguagesSelect
