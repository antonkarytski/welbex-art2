import React from 'react'
import { links } from '../../navigation/links'
import { LangStructure } from '../../translations/types'
import FeedbackIcon from '../../ui/icons/Icon.Comment'
import DeleteIcon from '../../ui/icons/Icon.Delete'
import LanguageIcon from '../../ui/icons/Icon.Language'
import NotificationsIcon from '../../ui/icons/Icon.Notifications'
import QuestionIcon from '../../ui/icons/Icon.Question'
import StarIcon from '../../ui/icons/Icon.Star'
import { IconProps } from '../../ui/icons/_types'

export type SettingItem = {
  name: string
  icon: ({ size, color, style }: IconProps) => React.ReactElement
  navigateTo: keyof typeof links
}

export const getSettingsList = (t: LangStructure): SettingItem[] => [
  {
    name: t.subscription,
    icon: StarIcon,
    navigateTo: links.subscriptionSelectPlan,
  },
  { name: t.faq, icon: QuestionIcon, navigateTo: links.faq },
  { name: t.feedback, icon: FeedbackIcon, navigateTo: links.feedback },
  {
    name: t.notifications,
    icon: NotificationsIcon,
    navigateTo: links.notifications,
  },
  {
    name: t.language,
    icon: LanguageIcon,
    navigateTo: links.language,
  },
  {
    name: t.deleteAccount,
    icon: DeleteIcon,
    navigateTo: links.deleteAccount,
  },
]
