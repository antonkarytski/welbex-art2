import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Avatar from '../../ui/Avatar'
import IconButton from '../../ui/buttons/IconButton'
import EditIcon from '../../ui/icons/Icon.Edit'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import UserDescription, { localeAgeTextFull } from './UserDescription'
import { User } from './types'

type UserAvatarProps = {
  item: User
  style?: StyleProp<ViewStyle>
}

const UserAvatar = ({ item, style }: UserAvatarProps) => {
  const text = useText()
  const navigate = useNavigate()
  const { styles, colors } = useTheme(themedStyles)

  // TODO !!! onEditProfile - добавить проверку

  return (
    <View style={style}>
      <Avatar style={styles.avatar} size={116} src={item.avatar}>
        <IconButton
          Icon={EditIcon}
          onPress={() => {
            navigate(links.editProfile)
          }}
          iconColor={colors.whiteText}
          style={styles.editProfileButton}
        />
      </Avatar>
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
    editProfileButton: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: colors.lightAccentDetails,
    },
  })
)

export default UserAvatar
