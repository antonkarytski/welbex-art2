import React from 'react'
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { useNavigate } from '../../../navigation'
import { LangStructure } from '../../../translations/types'
import Row from '../../../ui/Row'
import Span from '../../../ui/Span'
import ArrowToggleIcon from '../../../ui/icons/Icon.ArrowToggle'
import { SettingItem } from './settingsListData'

type SettingsListItemProps = {
  item: SettingItem
  text: LangStructure
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
  ({ item, text, textColor, style }: SettingsListItemProps) => {
    const navigate = useNavigate()

    const Icon = item.icon
    return (
      <TouchableOpacity
        onPress={() => navigate(item.navigateTo)}
        activeOpacity={0.6}
        style={style.item}
      >
        <Row style={style.row}>
          <Icon size={24} color={textColor} style={style.settingIcon} />
          <Span label={item.label(text)} weight={500} style={style.label} />
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
