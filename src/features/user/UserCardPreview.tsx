import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../themed'
import { useTheme, useThemedStyleList } from '../themed/hooks'
import Avatar from './Avatar'
import UserDescription from './UserDescription'
import { UserDescriptionStyles } from './styles'
import { User } from './types'

type UserCardPreviewProps = {
  item: User
}

const UserCardPreview = ({ item }: UserCardPreviewProps) => {
  const { styles, colors } = useThemedStyleList({
    common: themedStyles,
    description: themedDescriptionStyles,
  })

  return (
    <View style={styles.common.container}>
      <Avatar style={styles.common.avatar} src={item.avatar} />
      <UserDescription style={styles.description} item={item} />
    </View>
  )
}

const themedDescriptionStyles = createThemedStyle<UserDescriptionStyles>(
  (colors) =>
    StyleSheet.create({
      subText: {
        color: colors.lightText,
      },
    })
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      paddingTop: 24,
      paddingBottom: 20,
      flexDirection: 'row',
    },
    avatar: {
      borderColor: colors.primary1,
      marginRight: 16,
    },
  })
)

export default UserCardPreview
