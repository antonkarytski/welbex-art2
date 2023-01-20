import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { useThemeColors } from '../../features/themed/hooks'
import { switchThemedColors } from '../../styles/switch'
import { useText } from '../../translations/hook'
import ListItemSeparator from '../../ui/ListItemSeparator'
import Switch from '../../ui/Switch'
import {
  NotesForm,
  notesSettingsList,
  notesSettingsModel,
} from './model.notesSettings'

export default function NotesSettingsList() {
  const t = useText()
  const colors = useThemeColors()
  const switchColors = switchThemedColors(colors)
  const fields = useStore(notesSettingsModel.$store)

  useEffect(() => {
    console.log('fields', fields)
  }, [fields])

  return (
    <FlatList
      data={notesSettingsList}
      renderItem={({ item }: { item: keyof NotesForm }) => (
        <Switch
          label={t[item]}
          formModel={notesSettingsModel}
          name={item}
          colors={switchColors}
        />
      )}
      ItemSeparatorComponent={ListItemSeparator}
      ListFooterComponent={ListItemSeparator}
    />
  )
}
