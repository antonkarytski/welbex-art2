import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Profile, UserShort } from '../../api/parts/users/types'
import { useText } from '../../translations/hook'
import Avatar from '../../ui/Avatar'
import SubscribeButton from '../../ui/buttons/subscribeButton/SubscribeButton'
import {
  SubscribeButtonState,
  getSubscribeButtonPreset,
} from '../../ui/buttons/subscribeButton/styles'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import UserDescription, { localeAgeTextShort } from './UserDescription'
import { UserDescriptionStyles } from './styles'

type UserCardPreviewProps = {
  item: UserShort
  onAvatarPress?: (item: UserShort) => void
  onSubscribePress?: (item: UserShort) => void
}

const UserCardPreview = ({
  item,
  onAvatarPress,
  onSubscribePress,
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
      />
      <SubscribeButton
        theme={getSubscribeButtonPreset({
          theme,
          text,
          state: SubscribeButtonState.POSITIVE,
        })}
        style={styles.common.button}
        onPress={() => onSubscribePress?.(item)}
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
    button: {
      marginLeft: 'auto',
      paddingVertical: 8,
      paddingHorizontal: 24,
    },
  })
)

export default UserCardPreview
