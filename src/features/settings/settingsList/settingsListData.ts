import { ServerManager } from '@heyheyjude/toolkit'
import React from 'react'
import { Platform } from 'react-native'
import { MyProfile } from '../../../api/parts/users/types'
import { checkIsDev, server } from '../../../api/server'
import { ANDROID, IOS, IS_ANDROID } from '../../../lib/helpers/native/constants'
import { links } from '../../../navigation/links'
import { LangFn } from '../../../translations/types'
import FeedbackIcon from '../../../ui/icons/Icon.Comment'
import DeleteIcon from '../../../ui/icons/Icon.Delete'
import LanguageIcon from '../../../ui/icons/Icon.Language'
import NotificationsIcon from '../../../ui/icons/Icon.Notifications'
import QuestionIcon from '../../../ui/icons/Icon.Question'
import StarIcon from '../../../ui/icons/Icon.Star'
import { IconProps } from '../../../ui/icons/_types'

type SettingsLink =
  | links.subscriptionSelectPlan
  | links.notifications
  | links.language
  | links.deleteAccount
  | links.faq
  | links.feedback
  | links.subscriptionCurrent

type SettingsLinksFnProps = {
  profile: MyProfile | null
}

type FilterProps = {
  isAuth: boolean
}

export type SettingItem = {
  label: LangFn
  icon: (props: IconProps) => React.ReactElement
  navigateTo: SettingsLink | ((props: SettingsLinksFnProps) => SettingsLink)
  filter?: ({}: FilterProps) => boolean
}

const authFilter = ({ isAuth }: FilterProps) => isAuth

export const SETTINGS_LIST: SettingItem[] = [
  {
    label: (t) => t.subscription,
    icon: StarIcon,
    navigateTo: ({ profile }) =>
      profile?.subscription
        ? links.subscriptionCurrent
        : links.subscriptionSelectPlan,
    filter: ({ isAuth }) => isAuth && (IS_ANDROID || checkIsDev()),
  },
  {
    label: (t) => t.faq,
    icon: QuestionIcon,
    navigateTo: links.faq,
  },
  // {
  //   label: (t) => t.notifications,
  //   icon: NotificationsIcon,
  //   navigateTo: links.notifications,
  //   isAbleWhenUnauthorized: false,
  // },
  {
    label: (t) => t.language,
    icon: LanguageIcon,
    navigateTo: links.language,
  },
  {
    label: (t) => t.deleteAccount,
    icon: DeleteIcon,
    navigateTo: links.deleteAccount,
    filter: authFilter,
  },
  {
    label: (t) => t.feedback,
    icon: FeedbackIcon,
    navigateTo: links.feedback,
    filter: authFilter,
  },
]
