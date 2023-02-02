import React, { useMemo } from 'react'
import { SceneMap } from 'react-native-tab-view'
import { mapObject } from '../../../lib/helpers/array'
import { useText } from '../../../translations/hook'
import { LangFn } from '../../../translations/types'
import { User, UserDrawingListType } from '../types'
import UserDrawingsList from './UserDrawingsList'

export type TabsDescriptor = Partial<
  Record<UserDrawingListType, { label: LangFn }>
>

export const commonDrawingsListTabs: TabsDescriptor = {
  [UserDrawingListType.LIKED]: { label: (text) => text.liked },
  [UserDrawingListType.SAVED]: { label: (text) => text.saved },
}

export const childrenDrawingsListTabs: TabsDescriptor = {
  [UserDrawingListType.OWN]: { label: (text) => text.gallery },
  ...commonDrawingsListTabs,
}

export function useDrawingsTabs(tabs: TabsDescriptor, item: User) {
  const text = useText()
  const scenes = useMemo(() => {
    return SceneMap(
      mapObject(tabs, (_, key) => {
        const navigationIndex = Object.keys(tabs).indexOf(key)
        return () => (
          <UserDrawingsList
            type={key}
            item={item}
            navigationIndex={navigationIndex}
          />
        )
      })
    )
  }, [tabs, item])
  const routes = useMemo(
    () =>
      Object.entries(tabs).map(([key, { label }]) => {
        return { key: key as UserDrawingListType, title: label(text) }
      }),
    [tabs, text]
  )

  return { scenes, routes }
}

export function useCommonDrawingsListTabs(item: User) {
  return useDrawingsTabs(commonDrawingsListTabs, item)
}

export function useChildrenDrawingsListTabs(item: User) {
  return useDrawingsTabs(childrenDrawingsListTabs, item)
}
