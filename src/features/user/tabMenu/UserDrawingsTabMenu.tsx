import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import ActiveLineTint from './ActiveLineTint'
import TabMenuButtons from './TabMenuButtons'

type UserDrawingsTabMenuProps = SceneRendererProps & {
  routes: { key: string; title: string }[]
  activeTabKey?: string
  style?: StyleProp<ViewStyle>
}

const UserDrawingsTabMenu = ({
  jumpTo,
  position,
  layout,
  routes,
  activeTabKey,
  style,
}: UserDrawingsTabMenuProps) => {
  const styles = useThemedStyle(themedStyles)
  return (
    <View style={[styles.container, style]}>
      <TabMenuButtons
        routes={routes}
        onButtonPress={jumpTo}
        buttonLabelStyle={styles.buttonLabel}
        buttonActiveLabelStyle={styles.buttonLabelActive}
        activeTabKey={activeTabKey}
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

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    buttonLabel: {
      color: colors.profileTabText,
    },
    buttonLabelActive: {
      color: colors.text,
    },
    line: {
      backgroundColor: colors.profileTabLine,
    },
    tint: {
      backgroundColor: colors.tabsSelectedTint,
    },
  })
)

export default UserDrawingsTabMenu
