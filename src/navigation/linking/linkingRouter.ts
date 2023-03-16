import { LinkingOptions } from '@react-navigation/native'
import { links } from '../links'
import { ScreensProps } from '../types.screenProps'

export const linkingConfig: LinkingOptions<ScreensProps> = {
  prefixes: ['artsqrd://'],
  config: {
    initialRouteName: links.mainTabs,
    screens: {
      [links.authSubmit]: {
        path: 'auth/',
        parse: {
          has_phone_number: (value) => !value.startsWith('False'),
          has_date_of_birth: (value) => !value.startsWith('False'),
        },
      },
    },
  },
}
