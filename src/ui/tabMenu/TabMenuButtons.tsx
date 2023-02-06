import React from 'react'
import { StyleSheet, View } from 'react-native'
import TabMenuButton from './TabMenuButton'
import { TabMenuButtonStyle } from './types'

type TabMenuButtonsProps = {
  tabs: { key: string; title: string }[]
  onButtonPress: (key: string) => void
  activeTabKey?: string
  style?: TabMenuButtonStyle
}

const TabMenuButtons = ({
  tabs,
  onButtonPress,
  activeTabKey,
  style,
}: TabMenuButtonsProps) => {
  return (
    <View style={styles.container}>
      {tabs.map(({ key, title }) => {
        return (
          <TabMenuButton
            style={style}
            isActive={activeTabKey === key}
            onPress={onButtonPress}
            key={key}
            label={title}
            id={key}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
})

export default TabMenuButtons
