import React from 'react'
import { links } from '../../../navigation/links'
import { LangFn } from '../../../translations/types'
import FeedbackIcon from '../../../ui/icons/Icon.Comment'
import DeleteIcon from '../../../ui/icons/Icon.Delete'
import LanguageIcon from '../../../ui/icons/Icon.Language'
import NotificationsIcon from '../../../ui/icons/Icon.Notifications'
import QuestionIcon from '../../../ui/icons/Icon.Question'
import StarIcon from '../../../ui/icons/Icon.Star'
import { IconProps } from '../../../ui/icons/_types'

export type SettingItem = {
  label: LangFn
  icon: (props: IconProps) => React.ReactElement
  navigateTo:
    | links.subscriptionSelectPlan
    | links.notifications
    | links.language
    | links.deleteAccount
    | links.faq
    | links.feedback
}

export const settingsList: SettingItem[] = [
  {
    label: (t) => t.subscription,
    icon: StarIcon,
    navigateTo: links.subscriptionSelectPlan,
  },
  { label: (t) => t.faq, icon: QuestionIcon, navigateTo: links.faq },
  { label: (t) => t.feedback, icon: FeedbackIcon, navigateTo: links.feedback },
  {
    label: (t) => t.notifications,
    icon: NotificationsIcon,
    navigateTo: links.notifications,
  },
  {
    label: (t) => t.language,
    icon: LanguageIcon,
    navigateTo: links.language,
  },
  {
    label: (t) => t.deleteAccount,
    icon: DeleteIcon,
    navigateTo: links.deleteAccount,
  },
]
