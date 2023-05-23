import { useStoreMap } from 'effector-react'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { useText } from '../../../translations/hook'
import PhoneInputPreview from '../../../ui/phoneInput/PhoneInputPreview'
import { ColorThemeStructure } from '../../themed/theme'
import { $myProfile } from '../model'

type PhonePreviewProps = {
  colors: ColorThemeStructure
  style?: StyleProp<ViewStyle>
}

const PhonePreview = React.memo(({ colors, style }: PhonePreviewProps) => {
  const form = useStoreMap({
    store: $myProfile,
    keys: [],
    fn: (profile) =>
      profile
        ? { country: profile.country, phone: profile.phone_number }
        : null,
  })
  const t = useText()

  if (!form) return null
  return (
    <PhoneInputPreview
      colors={{
        background: colors.inputDisabledBackground,
        value: colors.inputDisabledText,
        border: colors.inputBorder,
        title: colors.inputTitle,
      }}
      style={style}
      title={t.phoneNumber}
      value={form.phone}
      country={form.country}
    />
  )
})

export default PhonePreview
