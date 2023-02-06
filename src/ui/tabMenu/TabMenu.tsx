import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types'
import { defaultColors } from '../../features/themed/theme'
import ActiveLineTint from './ActiveLineTint'
import TabMenuButtons from './TabMenuButtons'
import { TabMenuButtonStyles, TabRoute } from './types'

export type TabMenuStyles = TabMenuButtonStyles & {
  container?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>
  activeLine?: StyleProp<ViewStyle>
}

type TabMenuProps = SceneRendererProps & {
  routes: TabRoute[]
  activeTab?: TabRoute['key'] | number
  style?: TabMenuStyles
}

const TabMenu = ({
  jumpTo,
  position,
  layout,
  routes,
  activeTab,
  style,
}: TabMenuProps) => {
  return (
    <View style={[styles.container, style?.container]}>
      <TabMenuButtons
        tabs={routes}
        onButtonPress={jumpTo}
        activeTab={activeTab}
        style={style}
      />
      <ActiveLineTint
        style={[styles.line, style?.line]}
        tintStyle={[styles.tint, style?.activeLine]}
        position={position}
        width={layout.width - 40}
        routesCount={routes.length}
      />
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
