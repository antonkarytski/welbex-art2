import { Effect, Event, Store } from 'effector'
import { SceneRendererProps } from 'react-native-tab-view'
import { Layout } from 'react-native-tab-view/lib/typescript/src/types'
import { ArtPreview, ArtsListProps } from '../../../api/parts/arts/types'
import { PaginationListModelResponse } from '../../../lib/models/pagination/types'
import { UserDrawingListType } from '../types'

export type UserDrawingsListHeight = {
  [UserDrawingListType.OWN]: number
  [UserDrawingListType.LIKED]: number
  [UserDrawingListType.SAVED]: number
}

export type TabMenuNavigationProps = SceneRendererProps & {
  navigationState: {
    routes: Route[]
    index: number
  }
}

export type Route<K extends string = string> = {
  key: K
  icon?: string
  title?: string
  accessible?: boolean
  accessibilityLabel?: string
  tabBarPropsID?: string
}

export type UserArtsListHeightModel = {
  updateListsHeight: Event<Partial<UserDrawingsListHeight>>
  $listsHeight: Store<UserDrawingsListHeight>
  setActiveListTabKey: Event<UserDrawingListType>
  $activeListTabKey: Store<UserDrawingListType>
  updateListOffset: Event<Partial<UserDrawingsListHeight>>
  $listsOffsets: Store<UserDrawingsListHeight>
  reset: () => void
}

export type UserArtsTabMenuNavigationModel = {
  set: Effect<TabMenuNavigationProps, void, Error>
  $store: Store<{
    routes: Route[] | null
    index: number | null
    position: any
    jumpTo: ((key: string) => void) | null
    layout: Layout | null
  }>
  reset: () => void
}

export type ArtsListModel = PaginationListModelResponse<
  ArtPreview,
  ArtsListProps
>

export type UserArtsListsRequestModel = {
  model: {
    [UserDrawingListType.OWN]: ArtsListModel
    [UserDrawingListType.LIKED]: ArtsListModel
    [UserDrawingListType.SAVED]: ArtsListModel
  }
  reset: () => void
}
