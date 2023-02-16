import React, { useMemo } from 'react'
import { FlatList, FlatListProps, StyleProp, ViewStyle } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import { Profile, UserProfile, UserShort } from '../../../api/parts/users/types'
import { mapObject } from '../../../lib/helpers/array'
import { useText } from '../../../translations/hook'
import { LangFn } from '../../../translations/types'
import { UserDrawingListType } from '../types'
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

export type TabListSettings = {
  contentStyle?: StyleProp<ViewStyle>
  onScroll?: FlatListProps<any>['onScroll']
  listRef?: (tabKey: UserDrawingListType, ref: FlatList | null) => void
  onScrollEnd?: () => void
}

export function useDrawingsTabs(
  tabs: TabsDescriptor,
  item: Profile | UserShort | null,
  settings: TabListSettings = {}
) {
  const text = useText()
  const scenes = useMemo(
    () =>
      SceneMap(
        mapObject(tabs, (_, key) => {
          return () => (
            <UserDrawingsList
              ref={(ref) => {
                settings?.listRef?.(key, ref)
              }}
              onScroll={settings.onScroll}
              contentStyle={settings.contentStyle}
              onScrollEndDrag={settings.onScrollEnd}
              type={key}
              item={item}
            />
          )
        })
      ),
    [tabs, item, settings]
  )
  const routes = useMemo(
    () =>
      Object.entries(tabs).map(([key, { label }]) => {
        return { key: key as UserDrawingListType, title: label(text) }
      }),
    [tabs, text]
  )

  return { scenes, routes }
}

export function useCommonDrawingsListTabs(
  item: Profile,
  settings: TabListSettings = {}
) {
  return useDrawingsTabs(commonDrawingsListTabs, item, settings)
}

export function useChildrenDrawingsListTabs(
  item: Profile | UserShort,
  settings: TabListSettings = {}
) {
  return useDrawingsTabs(childrenDrawingsListTabs, item, settings)
}
