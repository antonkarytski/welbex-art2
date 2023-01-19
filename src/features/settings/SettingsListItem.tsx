import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigate } from '../../navigation'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import ArrowToggleIcon from '../../ui/icons/Icon.ArrowToggle'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { SettingItem } from './settingsListData'

type SettingsListItemProps = {
  item: SettingItem
}

const SettingsListItem = ({ item }: SettingsListItemProps) => {
  const navigate = useNavigate()
  const { styles, colors } = useTheme(themedStyles)

  const Icon = item.icon
  return (
    <TouchableOpacity
      onPress={() => navigate(item.navigateTo)}
      activeOpacity={0.6}
      style={styles.item}
    >
      <Row style={styles.row}>
        <Icon size={24} color={colors.text} style={styles.settingIcon} />
        <Span label={item.name} weight={500} style={styles.label} />
        <ArrowToggleIcon
          size={12}
          style={styles.toggleIcon}
          color={colors.text}
        />
      </Row>
    </TouchableOpacity>
  )
}

const themedStyles = createThemedStyle((colors) => ({
  item: {
    paddingVertical: 20,
  },
  row: {
    justifyContent: 'flex-start',
  },
  settingIcon: {
    marginRight: 18,
  },
  toggleIcon: {
    marginLeft: 'auto',
    transform: [{ rotate: '-90deg' }],
  },
  label: {
    fontSize: 16,
    lineHeight: 19,
    color: colors.text,
  },
}))

export default SettingsListItem
