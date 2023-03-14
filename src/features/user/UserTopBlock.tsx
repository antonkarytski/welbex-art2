import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IUserProfile, MyProfile } from '../../api/parts/users/types'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import FollowButton from './Button.Follow'
import UserAvatar from './UserAvatar'
import UserCountersBlock from './UserCountersBlock'
import { AVATAR_BACKGROUND_GRADIENT_HEIGHT } from './constants'
import { countFollowers } from './helpers'
import { UserItem } from './types'

export type UserTopBlockProps = {
  item: IUserProfile | (MyProfile & { is_followed?: never })
  updateItem?: (data: Partial<UserItem>) => void
}

const UserTopBlock = React.memo(({ item, updateItem }: UserTopBlockProps) => {
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
        {item.is_followed !== undefined && (
          <FollowButton
            item={item}
            onPress={(isFollowed) => {
              const followersCount = countFollowers(isFollowed, item.followers)
              updateItem?.({
                is_followed: isFollowed,
                followers: followersCount,
              })
            }}
            style={followButtonStyles}
          />
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

const followButtonStyles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_PADDING_HORIZONTAL,
  },
})

export default UserTopBlock
