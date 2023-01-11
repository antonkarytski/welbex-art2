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
    <View>
      <View
        style={{
          backgroundColor: colors.primary1,
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
        <View
          style={{
            height: 80,
          }}
        >
          <ProfileAvatar
            style={{
              transform: [{ translateY: 24 }],
              alignSelf: 'center',
            }}
            avatarStyle={{
              borderColor: colors.primary1,
            }}
            ageTextGenerator={localeAgeTextFull(text)}
          />
        </View>
      </View>
    </View>
  )
}

export default ProfileHeader
