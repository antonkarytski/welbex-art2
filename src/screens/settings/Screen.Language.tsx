import React from 'react'
import { StyleSheet } from 'react-native'
import { createStateModel } from 'altek-toolkit'
import { LANGUAGES_LIST, LanguageItem } from '../../constants/languages'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyle } from '../../features/themed/hooks'
import { useText } from '../../translations/hook'
import { languageModel } from '../../translations/model'
import ListItemSeparator from '../../ui/ListItemSeparator'
import Span from '../../ui/Span'
import Select from '../../ui/selects/Select'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

const selectModel = createStateModel(LANGUAGES_LIST[0])
selectModel.$state.watch((languageItem) => {
  languageModel.set(languageItem.key)
})

export default function LanguageScreen() {
  const t = useText()
  const styles = useThemedStyle(themedStyles)

  const renderItem = (item: LanguageItem) => (
    <Span label={t[item.name]} style={styles.languageLabel} weight={500} />
  )

  return (
    <SettingScreenContainer title={t.language}>
      <Select
        data={LANGUAGES_LIST}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeparator}
        idExtractor={({ key }) => key}
        model={selectModel}
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
