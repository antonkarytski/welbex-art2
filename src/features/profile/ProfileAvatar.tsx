import React from 'react'
import { Image, StyleProp, View, ViewStyle } from 'react-native'
import { romanov } from '../../_mock/users'
import Avatar from '../../ui/Avatar'
import Span from '../../ui/Span'
import UserCardPreview from '../user/UserCardPreview'
import UserDescription, { AgeTextGenerator } from '../user/UserDescription'

type ProfileAvatarProps = {
  style?: StyleProp<ViewStyle>
  avatarStyle?: StyleProp<ViewStyle>
  ageTextGenerator?: AgeTextGenerator
}

const ProfileAvatar = ({
  style,
  avatarStyle,
  ageTextGenerator,
}: ProfileAvatarProps) => {
  return (
    <View style={style}>
      <Avatar
        style={[avatarStyle, { alignSelf: 'center' }]}
        size={116}
        src={require('../../../assets/images/cat.png')}
      />
      <UserDescription
        style={{
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
        }}
        hideSeparator
        ageTextGenerator={ageTextGenerator}
        item={romanov}
      />
    </View>
  )
}

export default ProfileAvatar
