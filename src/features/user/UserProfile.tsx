import { useStore } from 'effector-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native'
import { Profile } from '../../api/parts/users/types'
import { UserProfileResponse } from '../../api/parts/users/types.api'
import { useThemedStyle } from '../../features/themed/hooks'
import UserHeader from '../../features/user/UserHeader'
import {
  AVATAR_BACKGROUND_GRADIENT_HEIGHT,
  HEADER_INITIAL_HEIGHT,
} from '../../features/user/constants'
import { UserDrawingListType } from '../../features/user/types'
import { tabMenuThemedStyles } from '../../styles/tabMenu'
import MotionGradient from '../../ui/gradients/MotionGradient'
import Loader from '../../ui/loaders/Loader'
import TabMenu from '../../ui/tabMenu/TabMenu'
import UserTopBlock from './UserTopBlock'
import UserDrawingsListsTabs from './drawingsList/UserDrawingsListTabs'
import { useDrawingsList } from './drawingsList/hooks'
import { TabsDescriptor } from './drawingsList/hooks.drawingTabs'
import {
  UserArtsListHeightModel,
  UserArtsListsRequestModel,
  UserArtsTabMenuNavigationModel,
} from './drawingsList/types'

type UserProfileProps = {
  user: Profile | (UserProfileResponse & { id: number })
  updateUser: (data: Partial<UserProfileResponse>) => void
  tabs: TabsDescriptor
  artsListsRequestModel: UserArtsListsRequestModel
  artsTabMenuNavigationModel: UserArtsTabMenuNavigationModel
  artsListsHeightModel: UserArtsListHeightModel
}

const data = [1]

const UserProfile = ({
  user,
  updateUser,
  tabs,
  artsListsRequestModel,
  artsListsHeightModel,
  artsTabMenuNavigationModel,
}: UserProfileProps) => {
  const tabMenuStyles = useThemedStyle(tabMenuThemedStyles)
  const [headerHeight, setHeaderHeight] = useState(HEADER_INITIAL_HEIGHT)
  const [tabMenuHeight, setTabMenuHeight] = useState(60)
  const [isRefreshing, setIsRefreshing] = useState(false)
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

  const { list, getFirst, getNext, isLoading, isNextLoading } = useDrawingsList(
    user,
    activeTabKey,
    artsListsRequestModel.model
  )

  useEffect(() => {
    getFirst()
  }, [getFirst])

  const handleTabMenuLayout = useCallback((e: LayoutChangeEvent) => {
    setTabMenuHeight(e.nativeEvent.layout.height)
  }, [])

  const handleRefreshArts = useCallback(() => {
    if (!user || !activeTabKey) return
    setIsRefreshing(true)
    artsListsRequestModel.model[activeTabKey]
      .get({ userId: user.id })
      .finally(() => setIsRefreshing(false))
  }, [user, activeTabKey, artsListsRequestModel])

  const handleEndReached = useCallback(() => {
    if (!list.length || isLoading) return
    getNext()
  }, [list, getNext, isLoading])

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
      ),
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
        onRefresh={handleRefreshArts}
        refreshing={isRefreshing}
        nestedScrollEnabled
        ListHeaderComponent={
          <UserTopBlock item={user} updateItem={updateUser} />
        }
        ListFooterComponent={
          <UserDrawingsListsTabs
            user={user}
            tabs={tabs}
            tabMenuHeight={tabMenuHeight}
            tabMenuNavigationModel={artsTabMenuNavigationModel}
            artsListsRequestModel={artsListsRequestModel}
            artsListsHeightModel={artsListsHeightModel}
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
