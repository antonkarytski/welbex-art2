import React from 'react'
import { View } from 'react-native'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { useText } from '../../translations/hook'
import { useColors } from '../themed'
import { localeAgeTextFull } from '../user/UserDescription'
import ProfileAvatar from './ProfileAvatar'

type ProfileHeaderProps = {}

const ProfileHeader = ({}: ProfileHeaderProps) => {
  const text = useText()
  const colors = useColors()

  return (
    <View style={{ marginBottom: -56 }}>
      <View
        style={{
          backgroundColor: colors.primary1,
          paddingBottom: 80,
        }}
      >
        <ScreenHeader
          style={{
            title: {
              color: colors.whiteText,
            },
            line: {
              backgroundColor: colors.primary2,
            },
          }}
          title={text.myProfile}
        />
      </View>
      <ProfileAvatar
        style={{
          transform: [{ translateY: -56 }],
          alignSelf: 'center',
        }}
        avatarStyle={{
          borderColor: colors.primary1,
        }}
        ageTextGenerator={localeAgeTextFull(text)}
      />
    </View>
  )
}

export default ProfileHeader
