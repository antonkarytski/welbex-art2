import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Avatar from '../../ui/Avatar'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import UserDescription, { localeAgeTextFull } from './UserDescription'
import { User } from './types'

type UserAvatarProps = {
  item: User
  style?: StyleProp<ViewStyle>
}

const UserAvatar = ({ item, style }: UserAvatarProps) => {
  const text = useText()
  const navigate = useNavigate()
  const styles = useThemedStyle(themedStyles)

  // TODO !!! showEditIcon - добавить проверку

  return (
    <View style={style}>
      <Avatar
        style={styles.avatar}
        size={116}
        src={item.avatar}
        showEditIcon={true}
        onPress={() => {
          navigate(links.editProfile)
        }}
      />
      <UserDescription
        style={styles}
        hideSeparator
        ageTextGenerator={localeAgeTextFull(text)}
        item={item}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    avatar: {
      alignSelf: 'center',
      borderColor: colors.primary1,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
    },
    name: {
      fontSize: 20,
    },
    subText: {
      marginTop: 8,
    },
  })
)

export default UserAvatar
