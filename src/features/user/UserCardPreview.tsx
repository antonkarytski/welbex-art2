import React from 'react'
import { StyleSheet, View } from 'react-native'
import { UserShort } from '../../api/parts/users/types'
import { UserProfileResponse } from '../../api/parts/users/types.api'
import { useText } from '../../translations/hook'
import Avatar from '../../ui/Avatar'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import FollowButton, { FollowButtonProps } from './Button.Follow'
import UserDescription, { localeAgeTextShort } from './UserDescription'
import { UserDescriptionStyles } from './styles'

type UserCardPreviewProps = {
  item: UserShort
  onAvatarPress?: (item: UserShort) => void
  onFollowPress?: FollowButtonProps['onPress']
}

const UserCardPreview = ({
  item,
  onAvatarPress,
  onFollowPress,
}: UserCardPreviewProps) => {
  const text = useText()
  const { styles, theme } = useThemedStyleList({
    common: themedStyles,
    description: themedDescriptionStyles,
  })

  return (
    <View style={styles.common.container}>
      <Avatar
        onPress={() => onAvatarPress?.(item)}
        style={styles.common.avatar}
        src={item.avatar}
      />
      <UserDescription
        ageTextGenerator={localeAgeTextShort(text)}
        style={styles.description}
        item={item}
        shortenCountryName
        shortenUserName
      />
      <FollowButton
        item={item}
        onPress={onFollowPress}
        style={followButtonStyles}
      />
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
      alignItems: 'center',
    },
    avatar: {
      borderColor: colors.primary1,
      marginRight: 16,
    },
  })
)

const followButtonStyles = StyleSheet.create({
  label: {
    fontSize: 14,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  container: {
    marginLeft: 'auto',
  },
})

export default UserCardPreview
