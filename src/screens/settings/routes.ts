import { links } from '../../navigation/links'
import { RoutesList } from '../types'
import DeleteAccountScreen from './Screen.DeleteAccount'
import FaqScreen from './Screen.Faq'
import FeedBackScreen from './Screen.FeedBack'
import LanguageScreen from './Screen.Language'
import NotificationsScreen from './Screen.Notifications'
import SettingsScreen from './Screen.Settings'

export const SETTINGS_ROUTES: RoutesList = [
  {
    name: links.settings,
    component: SettingsScreen,
  },
  {
    name: links.faq,
    component: FaqScreen,
  },
  {
    name: links.feedback,
    component: FeedBackScreen,
  },
  {
    name: links.language,
    component: LanguageScreen,
  },
  {
    name: links.notifications,
    component: NotificationsScreen,
  },
  {
    name: links.deleteAccount,
    component: DeleteAccountScreen,
  },
]
