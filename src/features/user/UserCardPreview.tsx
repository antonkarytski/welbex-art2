import React from 'react'
import { StyleSheet, View } from 'react-native'
import { romanov } from '../../_mock/users'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import Avatar from './Avatar'
import { User } from './types'

type UserCardPreviewProps = {
  item: User
}

const UserCardPreview = ({ item }: UserCardPreviewProps) => {
  const { styles, colors } = useTheme(themedStyles)

  return (
    <View style={styles.container}>
      <Avatar style={styles.avatar} src={item.avatar} />
    </View>
  )
}

const themedStyles = createThemedStyle(() =>
  StyleSheet.create({
    container: {
      paddingTop: 24,
      paddingBottom: 20,
      flexDirection: 'row',
    },
    avatar: {
      marginRight: 16,
    },
  })
)

export default UserCardPreview
