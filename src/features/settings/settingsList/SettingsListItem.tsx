import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { useNavigate } from '../../../navigation'
import Row from '../../../ui/Row'
import Span from '../../../ui/Span'
import ArrowToggleIcon from '../../../ui/icons/Icon.ArrowToggle'
import { $myProfile } from '../../profile/model'
import { SettingItem } from './settingsListData'

type SettingsListItemProps = {
  item: SettingItem
  label: string
  textColor: string
  style: {
    item: StyleProp<ViewStyle>
    row: StyleProp<ViewStyle>
    settingIcon: StyleProp<ViewStyle>
    toggleIcon: StyleProp<ViewStyle>
    label: StyleProp<TextStyle>
  }
}

const SettingsListItem = React.memo(
  ({ item, label, textColor, style }: SettingsListItemProps) => {
    const navigate = useNavigate()
    const profile = useStore($myProfile)

    const Icon = item.icon
    return (
      <TouchableOpacity
        onPress={() => {
          const link =
            typeof item.navigateTo === 'function'
              ? item.navigateTo({ profile: profile })
              : item.navigateTo
          navigate(link)
        }}
        activeOpacity={0.6}
        style={style.item}
      >
        <Row style={style.row}>
          <Icon size={24} color={textColor} style={style.settingIcon} />
          <Span label={label} weight={500} style={style.label} />
          <ArrowToggleIcon
            size={12}
            style={style.toggleIcon}
            color={textColor}
          />
        </Row>
      </TouchableOpacity>
    )
  }
)

export default SettingsListItem
