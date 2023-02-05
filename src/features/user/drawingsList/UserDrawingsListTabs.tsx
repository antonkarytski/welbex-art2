import React, { PropsWithChildren, useCallback, useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import {
  Route,
  SceneRendererProps,
} from 'react-native-tab-view/lib/typescript/src/types'
import { SCREEN_WIDTH, STATUSBAR_HEIGHT } from '../../../lib/device/dimensions'
import Gradient from '../../../ui/gradients/Gradient'
import { defaultColors } from '../../themed/theme'
import UserDrawingsTabMenu from '../tabMenu/UserDrawingsTabMenu'

type UserDrawingsListTabsProps<T extends Route> = PropsWithChildren<{
  tabsProps: {
    scenes: (
      props: SceneRendererProps & {
        route: T
      }
    ) => React.ReactNode
    routes: (T & { title: string })[]
  }
  style?: StyleProp<ViewStyle>
  scrollHeaderWrapperStyle?: StyleProp<ViewStyle>
}>

const UserDrawingsListTabs = React.memo(
  <T extends Route>({
    style,
    children,
    tabsProps,
    scrollHeaderWrapperStyle,
  }: UserDrawingsListTabsProps<T>) => {
    const [index, setIndex] = useState(0)
    const { scenes, routes } = tabsProps
    const activeTabKey = routes[index]?.key
    const renderTabBar = useCallback(
      (props: SceneRendererProps) => {
        return (
          <>
            <View style={{ height: STATUSBAR_HEIGHT }} />
            <UserDrawingsTabMenu
              {...props}
              routes={routes}
              activeTabKey={activeTabKey}
              style={[styles.tabs, style]}
            />
          </>
        )
      },
      [routes, style, activeTabKey]
    )

    return (
      <>
        <View style={[styles.statusBarGradient]}>
          <Gradient />
        </View>
        <CollapsibleHeaderTabView
          renderScrollHeader={() => (
            <View
              renderToHardwareTextureAndroid
              style={[styles.scrollHeaderWrapper, scrollHeaderWrapperStyle]}
            >
              {children}
            </View>
          )}
          renderTabBar={renderTabBar}
          navigationState={{ index, routes: tabsProps.routes }}
          renderScene={scenes}
          onIndexChange={setIndex}
          initialLayout={{ width: SCREEN_WIDTH }}
          pagerStyle={styles.pagerStyle}
          animationEnabled
          renderToHardwareTextureAndroid
          scrollEnabled
        />
      </>
    )
  }
)

const styles = StyleSheet.create({
  statusBarGradient: {
    height: STATUSBAR_HEIGHT,
    position: 'absolute',
    zIndex: 2,
    top: 0,
    width: '100%',
  },
  scrollHeaderWrapper: {
    marginBottom: -STATUSBAR_HEIGHT,
    paddingBottom: 20,
    backgroundColor: defaultColors.screenBackground,

    flexGrow: 1,
  },
  tabs: {
    backgroundColor: defaultColors.screenBackground,
  },
  pagerStyle: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
})

export default UserDrawingsListTabs
