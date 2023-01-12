import React, { useCallback, useState } from 'react'
import { StyleProp, ViewStyle, useWindowDimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import {
  Route,
  SceneRendererProps,
} from 'react-native-tab-view/lib/typescript/src/types'
import UserDrawingsTabMenu from '../tabMenu/UserDrawingsTabMenu'

type UserDrawingsListTabViewProps<T extends Route> = {
  scenes: (
    props: SceneRendererProps & {
      route: T
    }
  ) => React.ReactNode
  routes: (T & { title: string })[]
  style?: StyleProp<ViewStyle>
}

const UserDrawingsListTabView = React.memo(
  <T extends Route>({
    style,
    scenes,
    routes,
  }: UserDrawingsListTabViewProps<T>) => {
    const layout = useWindowDimensions()
    const [index, setIndex] = useState(0)

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
        renderScene={scenes}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    )
  }
)

export default UserDrawingsListTabView
