import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FnExt } from '../../types'
import TabMenuButton from './TabMenuButton'
import { TabMenuButtonStyles, TabRoute } from './types'

type TabMenuButtonsProps = {
  tabs: TabRoute[]
  onButtonPress: FnExt<TabRoute['key']>
  activeTab?: TabRoute['key'] | number
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
