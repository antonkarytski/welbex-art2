import React from 'react'
import { StyleSheet, View } from 'react-native'
import TabMenuButton from './TabMenuButton'
import { TabMenuButtonStyles, TabRoute } from './types'

type TabMenuButtonsProps = {
  tabs: TabRoute[]
  onButtonPress: (key: TabRoute['key'], index: number) => void
  activeTab?: TabRoute['key'] | number | null
  style?: TabMenuButtonStyles
}

const TabMenuButtons = ({
  tabs,
  onButtonPress,
  activeTab,
  style,
}: TabMenuButtonsProps) => {
  return (
    <View style={styles.container}>
      {tabs.map(({ key, title }, index) => {
        return (
          <TabMenuButton
            style={style}
            isActive={
              activeTab === (typeof activeTab === 'number' ? index : key)
            }
            onPress={onButtonPress}
            key={key}
            label={title}
            id={key}
            index={index}
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
