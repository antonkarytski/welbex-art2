import React from 'react'
import { Animated, ViewStyle } from 'react-native'
import TabMenu, { TabMenuProps } from './TabMenu'

type UserDrawingsTabMenuProps = TabMenuProps & {
  animatedStyle?: Animated.AnimatedProps<ViewStyle>
}

const AnimatedTabMenu = ({
  activeTab,
  style,
  animatedStyle,
  ...props
}: UserDrawingsTabMenuProps) => {
  return (
    <Animated.View style={animatedStyle}>
      <TabMenu {...props} style={style} activeTab={activeTab} />
    </Animated.View>
  )
}

export default AnimatedTabMenu
