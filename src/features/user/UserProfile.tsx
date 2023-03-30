import { useStore } from 'effector-react'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native'
import { IUserProfile, MyProfile } from '../../api/parts/users/types'
import { UserProfileResponse } from '../../api/parts/users/types.api'
import UserHeader from '../../features/user/UserHeader'
import { tabMenuThemedStyles } from '../../styles/tabMenu'
import MotionGradient from '../../ui/gradients/MotionGradient'
import Loader from '../../ui/loaders/Loader'
import TabMenu from '../../ui/tabMenu/TabMenu'
import { useThemedStyle } from '../themed/hooks'
import UserTopBlock from './UserTopBlock'
import {
  AVATAR_BACKGROUND_GRADIENT_HEIGHT,
  HEADER_INITIAL_HEIGHT,
} from './constants'
import UserDrawingsListsTabs from './drawingsList/UserDrawingsListTabs'
import { useDrawingsList } from './drawingsList/hooks'
import { TabsDescriptor } from './drawingsList/hooks.drawingTabs'
import {
  UserArtsListHeightModel,
  UserArtsListsRequestModel,
  UserArtsTabMenuNavigationModel,
} from './drawingsList/types'
import { UserDrawingListType } from './types'

type UserProfileProps = {
  user: IUserProfile | (MyProfile & { is_followed?: never })
  updateUser?: (data: Partial<UserProfileResponse>) => void
  onRefreshUser: () => void
  tabs: TabsDescriptor
  artsListsRequestModel: UserArtsListsRequestModel
  artsTabMenuNavigationModel: UserArtsTabMenuNavigationModel
  artsListsHeightModel: UserArtsListHeightModel
}

const data = [1]

const UserProfile = ({
  user,
  updateUser,
  onRefreshUser,
  tabs,
  artsListsRequestModel,
  artsListsHeightModel,
  artsTabMenuNavigationModel,
}: UserProfileProps) => {
  const tabMenuStyles = useThemedStyle(tabMenuThemedStyles)
  const [headerHeight, setHeaderHeight] = useState(HEADER_INITIAL_HEIGHT)
  const [tabMenuHeight, setTabMenuHeight] = useState(60)
  const [userTopBlockHeight, setUserTopBlockHeight] = useState(300)

  const tabMenuProps = useStore(artsTabMenuNavigationModel.$store)
  const {
    routes,
    layout,
    index: activeTabIndex,
    jumpTo: jumpToTab,
  } = tabMenuProps

  const defaultTabKey =
    (tabs.own && UserDrawingListType.OWN) || UserDrawingListType.LIKED

  const activeTabKey = routes
    ? (routes[activeTabIndex ?? 0].key as UserDrawingListType)
    : defaultTabKey

  const gradientOffset = new Animated.Value(0)

  const { list, getFirst, getNext, isNextLoading, isRefreshing, refresh } =
    useDrawingsList(user, activeTabKey, artsListsRequestModel.model)

  useEffect(() => {
    getFirst()
  }, [getFirst])

  const handleTabMenuLayout = useCallback((e: LayoutChangeEvent) => {
    setTabMenuHeight(e.nativeEvent.layout.height)
  }, [])

  const onUserTopBlockLayout = useCallback((e: LayoutChangeEvent) => {
    setUserTopBlockHeight(e.nativeEvent.layout.height)
  }, [])

  const handleRefresh = useCallback(() => {
    onRefreshUser()
    refresh()
  }, [onRefreshUser, refresh])

  const handleEndReached = useCallback(() => {
    if (!list.length || isNextLoading) return
    getNext()
  }, [getNext, list, isNextLoading])

  const renderItem = useCallback(
    () =>
      routes && layout && jumpToTab ? (
        <TabMenu
          onLayout={handleTabMenuLayout}
          activeTab={activeTabIndex}
          routes={routes}
          position={tabMenuProps.position}
          jumpTo={jumpToTab}
          layout={layout}
          style={tabMenuStyles}
        />
      ) : (
        <View />
      ), // eslint-disable-next-line
    [tabMenuProps, handleTabMenuLayout, tabMenuStyles]
  )

  return (
    <View style={[styles.container, isNextLoading && { flex: 1 }]}>
      <MotionGradient
        offsetValue={gradientOffset}
        minHeight={headerHeight}
        maxHeight={headerHeight + AVATAR_BACKGROUND_GRADIENT_HEIGHT}
      />
      <UserHeader
        item={user}
        height={headerHeight}
        onHeightChange={setHeaderHeight}
      />
      <FlatList
        data={data}
        stickyHeaderIndices={[1]}
        renderItem={renderItem}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        nestedScrollEnabled
        ListHeaderComponent={
          <UserTopBlock
            item={user}
            updateItem={updateUser}
            onLayout={onUserTopBlockLayout}
          />
        }
        ListFooterComponent={
          <UserDrawingsListsTabs
            user={user}
            tabs={tabs}
            tabMenuHeight={tabMenuHeight}
            tabMenuNavigationModel={artsTabMenuNavigationModel}
            artsListsRequestModel={artsListsRequestModel}
            artsListsHeightModel={artsListsHeightModel}
            listTopBlockHeight={
              tabMenuHeight + headerHeight + userTopBlockHeight
            }
          />
        }
        onEndReached={handleEndReached}
      />
      {isNextLoading && <Loader />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default UserProfile
