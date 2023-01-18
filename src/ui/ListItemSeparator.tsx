import { View } from 'native-base'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

type ListItemSeparatorProps = {
  style: StyleProp<ViewStyle>
}

const ListItemSeparator = React.memo(({ style }: ListItemSeparatorProps) => {
  return <View style={[styles.separator, style]} />
})

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#F2F4F4',
  },
})

export default ListItemSeparator
