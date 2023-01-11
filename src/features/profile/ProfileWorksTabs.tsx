import React, { useEffect, useRef } from 'react'
import {
  Animated,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { animationInterpolate } from 'altek-toolkit'
import Span from '../../ui/Span'
import { useColors } from '../themed'

type ProfileWorksTabsProps = {}
const FirstRoute = () => <View style={{ flex: 1 }} />

const SecondRoute = () => <View style={{ flex: 1 }} />

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

const ProfileWorksTabs = ({}: ProfileWorksTabsProps) => {
  const layout = useWindowDimensions()
  const colors = useColors()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])

  return (
    <TabView
      style={{
        marginTop: 20,
        paddingHorizontal: 20,
      }}
      renderTabBar={({ position, jumpTo, layout, navigationState }) => {
        return (
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              {routes.map(({ key, title }) => {
                return (
                  <TouchableOpacity
                    onPress={() => jumpTo(key)}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 12,
                    }}
                    key={key}
                  >
                    <Span
                      weight={500}
                      style={{
                        fontSize: 18,
                        color: colors.profileTabText,
                      }}
                      label={title}
                    />
                  </TouchableOpacity>
                )
              })}
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: colors.profileTabLine,
                width: '100%',
              }}
            >
              <Animated.View
                style={{
                  left: 0,
                  top: 0,
                  position: 'absolute',
                  width: '50%',
                  backgroundColor: colors.tabsSelectedTint,
                  height: 1,
                  transform: [
                    {
                      translateX: animationInterpolate(
                        position,
                        [0, 1],
                        [0, (layout.width - 40) / 2]
                      ),
                    },
                  ],
                }}
              />
            </View>
          </View>
        )
      }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default ProfileWorksTabs
