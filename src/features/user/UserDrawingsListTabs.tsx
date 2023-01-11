import React, { useCallback, useMemo } from 'react'
import { StyleProp, ViewStyle, useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types'
import { useText } from '../../translations/hook'
import UserDrawingsList from './UserDrawingsList'
import UserDrawingsTabMenu from './tabMenu/UserDrawingsTabMenu'
import { UserDrawingListType, UserExt } from './types'

type UserDrawingsListTabsProps = {
  item: UserExt
  style?: StyleProp<ViewStyle>
}

const UserDrawingsListTabs = ({ style, item }: UserDrawingsListTabsProps) => {
  const layout = useWindowDimensions()
  const text = useText()
  const [index, setIndex] = React.useState(0)

  const renderScene = useMemo(
    () =>
      SceneMap({
        [UserDrawingListType.OWN]: () => {
          return <UserDrawingsList type={UserDrawingListType.OWN} item={item} />
        },
        [UserDrawingListType.SAVED]: () => {
          return (
            <UserDrawingsList type={UserDrawingListType.SAVED} item={item} />
          )
        },
        [UserDrawingListType.LIKED]: () => {
          return (
            <UserDrawingsList type={UserDrawingListType.LIKED} item={item} />
          )
        },
      }),
    [item]
  )

  const routes = useMemo(
    () => [
      { key: UserDrawingListType.OWN, title: text.myGallery },
      { key: UserDrawingListType.LIKED, title: text.liked },
      { key: UserDrawingListType.SAVED, title: text.saved },
    ],
    [text]
  )

  const renderTabBar = useCallback(
    (props: SceneRendererProps) => {
      return <UserDrawingsTabMenu {...props} routes={routes} />
    },
    [routes]
  )

  return (
    <TabView
      style={style}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default UserDrawingsListTabs
