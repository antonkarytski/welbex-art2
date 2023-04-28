import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { UserShort } from '../../api/parts/users/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Avatar from '../../ui/Avatar'
import IconButton from '../../ui/buttons/IconButton'
import EditIcon from '../../ui/icons/Icon.Edit'
import { $myProfile } from '../profile/model'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import UserDescription, { localeAgeTextFull } from './UserDescription'

type UserAvatarProps = {
  item: UserShort
  style?: StyleProp<ViewStyle>
}

const UserAvatarBlock = ({ item, style }: UserAvatarProps) => {
  const text = useText()
  const navigate = useNavigate()
  const { styles, colors } = useTheme(themedStyles)
  const myProfile = useStore($myProfile)

  return (
    <View style={style}>
      <Avatar style={styles.avatar} size={116} src={item.avatar}>
        {myProfile?.id === item.id && (
          <IconButton
            Icon={EditIcon}
            onPress={() => {
              navigate(links.editProfile)
            }}
            iconColor={colors.whiteText}
            style={styles.editProfileButton}
          />
        )}
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
      color: colors.text,
    },
    subText: {
      marginTop: 8,
      color: colors.text,
    },
    editProfileButton: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: colors.lightAccentDetails,
    },
  })
)

export default UserAvatarBlock
