import React from 'react'
import { UserItem } from '../types'
import UserDrawingsListTabView from './UserDrawingsListTabView'
import {
  TabListSettings,
  TabsDescriptor,
  useDrawingsTabs,
} from './hooks.drawingTabs'
import {
  UserArtsListHeightModel,
  UserArtsListsRequestModel,
  UserArtsTabMenuNavigationModel,
} from './types'

type UserDrawingsListTabsProps = {
  tabs: TabsDescriptor
  user: UserItem
  tabMenuNavigationModel: UserArtsTabMenuNavigationModel
  artsListsRequestModel: UserArtsListsRequestModel
  artsListsHeightModel: UserArtsListHeightModel
  tabMenuHeight: number
  listSettings?: TabListSettings
  listTopBlockHeight?: number
}

const UserDrawingsListTabs = React.memo(
  ({
    user,
    tabs,
    tabMenuHeight,
    listSettings,
    tabMenuNavigationModel,
    artsListsRequestModel,
    artsListsHeightModel,
    listTopBlockHeight,
  }: UserDrawingsListTabsProps) => {
    const tabsProps = useDrawingsTabs({
      tabs,
      item: user,
      artsListsRequestModel: artsListsRequestModel.model,
      artsListsHeightModel,
      settings: listSettings,
      listTopBlockHeight,
    })

    return (
      <UserDrawingsListTabView
        {...tabsProps}
        tabMenuHeight={tabMenuHeight}
        tabMenuNavigationModel={tabMenuNavigationModel}
        listsHeightModel={artsListsHeightModel}
      />
    )
  }
)

export default UserDrawingsListTabs
