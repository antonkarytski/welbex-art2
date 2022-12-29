import { ActivityAction, startActivityAsync } from 'expo-intent-launcher'
import { Linking } from 'react-native'
import { APP_PACKAGE_ID } from '../../constants/app'
import { IS_IOS } from '../helpers/native/constants'

export function goToSettings() {
  if (IS_IOS) {
    return Linking.openURL('app-settings:')
  }
  return startActivityAsync(ActivityAction.APPLICATION_DETAILS_SETTINGS, {
    data: APP_PACKAGE_ID,
  })
}
