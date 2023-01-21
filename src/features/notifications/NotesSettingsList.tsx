import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import ListItemSeparator from '../../ui/ListItemSeparator'
import NoteSettingItem from './NoteSettingItem'
import {
  NotesTranslations,
  notesSettingsList,
  notesSettingsModel,
} from './model.notesSettings'

const NotesSettingsList = () => {
  const fields = useStore(notesSettingsModel.$store)

  const renderItem = useCallback(
    ({ item }: { item: NotesTranslations }) => <NoteSettingItem item={item} />,
    []
  )

  return (
    <FlatList
      data={notesSettingsList}
      renderItem={renderItem}
      ItemSeparatorComponent={ListItemSeparator}
      ListFooterComponent={ListItemSeparator}
    />
  )
}

export default NotesSettingsList
