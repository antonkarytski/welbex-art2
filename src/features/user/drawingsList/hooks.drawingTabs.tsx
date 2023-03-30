import { useStore } from 'effector-react'
import React, { useMemo } from 'react'
import { FlatList, FlatListProps, StyleProp, ViewStyle } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import { mapObject } from '../../../lib/helpers/array'
import { LangFn } from '../../../translations/types'
import FavouriteIcon from '../../../ui/icons/Icon.Favourite'
import LikeIcon from '../../../ui/icons/Icon.Heart'
import ImageIcon from '../../../ui/icons/Icon.Image'
import { $myProfile } from '../../profile/model'
import { useThemeColors } from '../../themed/hooks'
import { UserDrawingListType, UserItem } from '../types'
import UserDrawingsList from './UserDrawingsList'
import { UserArtsListHeightModel, UserArtsListsRequestModel } from './types'

type TabProps = {
  label: LangFn
  Icon: React.ComponentType<any>
}

type OwnTabDescriptor = { [UserDrawingListType.OWN]?: TabProps }

export type TabsDescriptor = Omit<
  Record<UserDrawingListType, TabProps>,
  UserDrawingListType.OWN
> &
  OwnTabDescriptor

const ownDrawingsListTab: OwnTabDescriptor = {
  [UserDrawingListType.OWN]: {
    label: (text) => text.gallery,
    Icon: ImageIcon,
  },
}

export const commonDrawingsListTabs: TabsDescriptor = {
  [UserDrawingListType.LIKED]: {
    label: (text) => text.liked,
    Icon: LikeIcon,
  },
  [UserDrawingListType.SAVED]: {
    label: (text) => text.saved,
    Icon: FavouriteIcon,
  },
}

export const childrenDrawingsListTabs: TabsDescriptor = {
  ...ownDrawingsListTab,
  ...commonDrawingsListTabs,
}

export const profileDrawingsListTabs: TabsDescriptor = {
  ...ownDrawingsListTab,
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
  listTopBlockHeight?: number
}

export function useDrawingsTabs({
  tabs,
  settings = {},
  ...props
}: UseDrawingsTabs) {
  const colors = useThemeColors()
  const myProfile = useStore($myProfile)
  const isMyProfile = props.item?.id === myProfile?.id

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
              isMyProfile={isMyProfile}
              {...props}
            />
          )
        })
      ),
    [tabs, settings, props]
  )
  const routes = useMemo(
    () =>
      Object.entries(tabs).map(([key, { Icon }]) => {
        return {
          key: key as UserDrawingListType,
          Icon: (isActive: boolean) => (
            <Icon color={isActive ? colors.text : colors.textLightGrey} />
          ),
        }
      }),
    [tabs, colors]
  )
  return { scenes, routes }
}
