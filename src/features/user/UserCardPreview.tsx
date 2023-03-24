import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { UserShort } from '../../api/parts/users/types'
import { useText } from '../../translations/hook'
import Avatar from '../../ui/Avatar'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import FollowButton, { FollowButtonProps } from './Button.Follow'
import UserDescription, { localeAgeTextShort } from './UserDescription'
import { UserDescriptionStyles } from './styles'

type UserCardPreviewProps = {
  item: UserShort
  onPress?: (item: UserShort) => void
  onFollowPress?: FollowButtonProps['onPress']
}

const UserCardPreview = ({
  item,
  onPress,
  onFollowPress,
}: UserCardPreviewProps) => {
  const text = useText()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    description: themedDescriptionStyles,
  })

  const handlePress = () => {
    onPress?.(item)
  }

  return (
    <View style={styles.common.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={styles.common.row}
      >
        <Avatar
          onPress={handlePress}
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
      </TouchableOpacity>
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
      marginRight: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
)

const followButtonStyles = StyleSheet.create({
  label: {
    fontSize: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  container: {
    marginLeft: 'auto',
  },
})

export default UserCardPreview
