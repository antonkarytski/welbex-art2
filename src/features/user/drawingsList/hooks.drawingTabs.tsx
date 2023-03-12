import React, { useMemo } from 'react'
import { FlatList, FlatListProps, StyleProp, ViewStyle } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import { mapObject } from '../../../lib/helpers/array'
import { useText } from '../../../translations/hook'
import { LangFn } from '../../../translations/types'
import { UserDrawingListType, UserItem } from '../types'
import UserDrawingsList from './UserDrawingsList'
import { UserArtsListHeightModel, UserArtsListsRequestModel } from './types'

type TabProps = { label: LangFn }

export type TabsDescriptor = Omit<
  Record<UserDrawingListType, TabProps>,
  UserDrawingListType.OWN
> & { [UserDrawingListType.OWN]?: TabProps }

export const commonDrawingsListTabs: TabsDescriptor = {
  [UserDrawingListType.LIKED]: { label: (text) => text.liked },
  [UserDrawingListType.SAVED]: { label: (text) => text.saved },
}

export const childrenDrawingsListTabs: TabsDescriptor = {
  [UserDrawingListType.OWN]: { label: (text) => text.gallery },
  ...commonDrawingsListTabs,
}

export const profileDrawingsListTabs: TabsDescriptor = {
  [UserDrawingListType.OWN]: { label: (text) => text.gallery },
  ...commonDrawingsListTabs,
}

export type TabListSettings = {
  contentStyle?: StyleProp<ViewStyle>
  onScroll?: FlatListProps<any>['onScroll']
  listRef?: (tabKey: UserDrawingListType, ref: FlatList | null) => void
  onScrollEnd?: () => void
}

type UseDrawingsTabs = {
  tabs: TabsDescriptor
  item: UserItem | null
  artsListsRequestModel: UserArtsListsRequestModel['model']
  artsListsHeightModel: UserArtsListHeightModel
  settings?: TabListSettings
}

export function useDrawingsTabs({
  tabs,
  settings = {},
  ...props
}: UseDrawingsTabs) {
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
              {...props}
            />
          )
        })
      ),
    [tabs, settings, props]
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
