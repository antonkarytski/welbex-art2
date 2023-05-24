import React from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { IUserProfile, MyProfile } from '../../api/parts/users/types'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { useIsMe } from '../profile/hook.isMe'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import FollowButton from './Button.Follow'
import UserAvatarBlock from './UserAvatarBlock'
import UserCountersBlock from './UserCountersBlock'
import ChildIdentityStatusMessage from './childDocument/ChildIdentityStatusMessage'
import { AVATAR_BACKGROUND_GRADIENT_HEIGHT } from './constants'
import { countFollowers } from './helpers'
import { UserItem } from './types'

export type UserTopBlockProps = {
  item: IUserProfile | (MyProfile & { is_followed?: never })
  onItemUpdate?: (data: Partial<UserItem>) => void
  onLayout?: (e: LayoutChangeEvent) => void
}

const UserTopBlock = React.memo(
  ({ item, onItemUpdate, onLayout }: UserTopBlockProps) => {
    const isMe = useIsMe(item.id)

    const { styles } = useThemedStyleList({
      common: themedStyles,
    })
    if (!item) return null

    return (
      <View onLayout={onLayout}>
        <View style={styles.common.userBlockBackgroundTransparent} />
        <View style={styles.common.userBlockBackground} />
        <View>
          <UserAvatarBlock style={styles.common.avatar} item={item} />
          {isMe && (
            <ChildIdentityStatusMessage
              style={styles.common.childIdentityStatus}
              status={(item as MyProfile).identity_determined_status_id}
            />
          )}
          {item.followers !== undefined && (
            <UserCountersBlock
              item={item}
              style={styles.common.countersBlock}
            />
          )}
          {item.is_followed !== undefined && (
            <FollowButton
              item={item}
              onPress={(isFollowed) => {
                const followersCount = countFollowers(
                  isFollowed,
                  item.followers
                )
                onItemUpdate?.({
                  is_followed: isFollowed,
                  followers: followersCount,
                })
              }}
              style={followButtonStyles}
            />
          )}
        </View>
      </View>
    )
  }
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    countersBlock: {
      marginTop: 24,
      marginBottom: 20,
    },
    childIdentityStatus: {
      marginBottom: 8,
    },
    avatar: {
      marginTop: 24,
      marginBottom: 8,
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
