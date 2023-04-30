import { openAuthSessionAsync } from 'expo-web-browser'
import { Linking } from 'react-native'
import { api } from '../../../api'
import { noop } from '../../../lib/helpers'
import { IS_IOS } from '../../../lib/helpers/native/constants'

const authWithService = (url: string) => {
  if (!IS_IOS) {
    Linking.openURL(url).catch(noop)
    return
  }
  openAuthSessionAsync(url)
    .then((e) => {
      if (e.type === 'success') return Linking.openURL(e.url)
    })
    .catch(noop)
}

export const authWithGoogle = () => {
  authWithService(api.auth.googleAuthUrl)
}

export const authWithApple = () => {
  authWithService(api.auth.appleAuthUrl)
}
