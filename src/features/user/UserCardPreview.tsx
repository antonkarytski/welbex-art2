import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useText } from '../../translations/hook'
import SubscribeButton from '../../ui/buttons/subscribeButton/SubscribeButton'
import {
  SubscribeButtonState,
  getSubscribeButtonPreset,
} from '../../ui/buttons/subscribeButton/styles'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import Avatar from './Avatar'
import UserDescription from './UserDescription'
import { UserDescriptionStyles } from './styles'
import { User } from './types'

type UserCardPreviewProps = {
  item: User
}

const UserCardPreview = ({ item }: UserCardPreviewProps) => {
  const text = useText()
  const { styles, theme } = useThemedStyleList({
    common: themedStyles,
    description: themedDescriptionStyles,
  })

  return (
    <View style={styles.common.container}>
      <Avatar style={styles.common.avatar} src={item.avatar} />
      <UserDescription style={styles.description} item={item} />
      <SubscribeButton
        theme={getSubscribeButtonPreset({
          theme,
          text,
          state: SubscribeButtonState.POSITIVE,
        })}
        style={styles.common.button}
        onPress={() => {}}
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
    },
  })
)

export default UserCardPreview
