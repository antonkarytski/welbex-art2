import React from 'react'
import { StyleSheet } from 'react-native'
import { useThemeColors } from '../../features/themed/hooks'
import { switchThemedColors } from '../../styles/switch'
import { useText } from '../../translations/hook'
import Switch from '../../ui/Switch'
import { NotesTranslations, notesSettingsModel } from './model.notesSettings'

type NotesSettingsItemProps = {
  item: NotesTranslations
}

const NoteSettingItem = ({ item }: NotesSettingsItemProps) => {
  const t = useText()
  const colors = useThemeColors()
  const switchColors = switchThemedColors(colors)

  return (
    <Switch
      label={t[item]}
      formModel={notesSettingsModel}
      name={item}
      colors={switchColors}
      style={styles}
    />
  )
}

const styles = StyleSheet.create({
  wrapper: { paddingVertical: 20 },
})

export default NoteSettingItem
