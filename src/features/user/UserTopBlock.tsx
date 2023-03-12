import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import UserAvatar from './UserAvatar'
import UserCountersBlock from './UserCountersBlock'
import { AVATAR_BACKGROUND_GRADIENT_HEIGHT } from './constants'
import { UserItem } from './types'

export type UserTopBlockProps = {
  item: UserItem | null
}

const UserTopBlock = React.memo(({ item }: UserTopBlockProps) => {
  const { styles } = useTheme(themedStyles)

  if (!item) return null

  return (
    <>
      <View style={styles.userBlockBackgroundTransparent} />
      <View style={styles.userBlockBackground} />
      <View>
        <UserAvatar style={styles.avatar} item={item} />
        {item.followers !== undefined && (
          <UserCountersBlock item={item} style={styles.countersBlock} />
        )}
      </View>
    </>
  )
})

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    countersBlock: {
      marginTop: 32,
      marginBottom: 20,
    },
    avatar: {
      marginTop: 24,
      alignSelf: 'center',
    },
    userBlockBackgroundTransparent: {
      position: 'absolute',
      height: AVATAR_BACKGROUND_GRADIENT_HEIGHT,
      width: '100%',
      backgroundColor: 'transparent',
    },
    userBlockBackground: {
      position: 'absolute',
      top: AVATAR_BACKGROUND_GRADIENT_HEIGHT,
      bottom: 0,
      width: '100%',
      backgroundColor: colors.screenBackground,
    },
  })
)

export default UserTopBlock
