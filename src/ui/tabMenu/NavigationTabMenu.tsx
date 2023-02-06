import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types'
import { defaultColors } from '../../features/themed/theme'
import ActiveLineTint from './ActiveLineTint'
import TabMenuButtons from './TabMenuButtons'
import { TabMenuButtonStyle } from './types'

type NavigationTabMenuProps = SceneRendererProps & {
  routes: { key: string; title: string }[]
  activeTabKey?: string
  style?: TabMenuButtonStyle & {
    container?: StyleProp<ViewStyle>
  }
}

const NavigationTabMenu = ({
  jumpTo,
  position,
  layout,
  routes,
  activeTabKey,
  style,
}: NavigationTabMenuProps) => {
  return (
    <View style={[styles.container, style?.container]}>
      <TabMenuButtons
        tabs={routes}
        onButtonPress={jumpTo}
        activeTabKey={activeTabKey}
        style={style}
      />
      <ActiveLineTint
        style={styles.line}
        tintStyle={styles.tint}
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

export default NavigationTabMenu
