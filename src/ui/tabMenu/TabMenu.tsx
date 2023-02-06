import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import { SCREEN_WIDTH } from '../../lib/device/dimensions'
import ActiveLineTint from './ActiveLineTint'
import TabMenuButtons from './TabMenuButtons'
import { TabMenuButtonStyle } from './types'

type TabMenuProps = {
  tabs: { key: string; title: string }[]
  activeTabKey?: string
  onTabPress: (key: string) => void
  style?: TabMenuButtonStyle & {
    container?: StyleProp<ViewStyle>
  }
}

const TabMenu = ({ onTabPress, tabs, activeTabKey, style }: TabMenuProps) => {
  return (
    <View style={[styles.container, style?.container]}>
      <TabMenuButtons
        tabs={tabs}
        onButtonPress={onTabPress}
        activeTabKey={activeTabKey}
        style={style}
      />
      {/* <ActiveLineTint
        style={styles.line}
        tintStyle={styles.tint}
        position={position}
        width={SCREEN_WIDTH - 40}
        routesCount={tabs.length}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  buttonLabel: {
    color: defaultColors.profileTabText,
  },
  buttonLabelActive: {
    color: defaultColors.text,
  },
  line: {
    backgroundColor: defaultColors.profileTabLine,
  },
  tint: {
    backgroundColor: defaultColors.tabsSelectedTint,
  },
})

export default TabMenu
