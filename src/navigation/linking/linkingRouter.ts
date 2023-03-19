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
          absent_fields: (value) => (value ? JSON.parse(value) : []),
        },
      },
    },
  },
}
