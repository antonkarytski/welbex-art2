import React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import ActiveLineTint from './ActiveLineTint'
import TabMenuButtons from './TabMenuButtons'

type UserDrawingsTabMenuProps = SceneRendererProps & {
  routes: { key: string; title: string }[]
}

const UserDrawingsTabMenu = ({
  jumpTo,
  position,
  layout,
  routes,
}: UserDrawingsTabMenuProps) => {
  const styles = useThemedStyle(themedStyles)

  return (
    <View style={styles.container}>
      <TabMenuButtons
        routes={routes}
        onButtonPress={jumpTo}
        buttonLabelStyle={styles.buttonLabel}
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
    line: {
      backgroundColor: colors.profileTabLine,
    },
    tint: {
      backgroundColor: colors.tabsSelectedTint,
    },
  })
)

export default UserDrawingsTabMenu
