import React, { useMemo } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import FeedbackIcon from '../../ui/icons/Icon.Comment'
import NotificationsIcon from '../../ui/icons/Icon.Notifications'
import QuestionIcon from '../../ui/icons/Icon.Question'
import StarIcon from '../../ui/icons/Icon.Star'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

const SettingsScreen = () => {
  const t = useText()
  const navigate = useNavigate()

  const data = useMemo(
    () => [
      {
        name: t.subscription,
        icon: <StarIcon />,
        navigateTo: links.subscriptionCurrent,
      },
      { name: t.faq, icon: <QuestionIcon />, navigateTo: links.faq },
      { name: t.feedback, icon: <FeedbackIcon />, navigateTo: links.feedback },
      {
        name: t.notifications,
        icon: <NotificationsIcon />,
        navigateTo: links.notifications,
      },
    ],
    [t]
  )

  return (
    <SettingScreenContainer title={t.settings}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigate(item.navigateTo)}
              activeOpacity={0.6}
            >
              <Row>
                {item.icon}
                <Span label={item.name} />
              </Row>
            </TouchableOpacity>
          )
        }}
      />
    </SettingScreenContainer>
  )
}

export default SettingsScreen
