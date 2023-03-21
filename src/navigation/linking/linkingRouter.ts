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
          absent_fields: (value) => {
            if (!value) return []
            if (value.endsWith('#')) {
              value = value.slice(0, -1)
            }
            value = value.replace(/'/g, '"')
            return JSON.parse(value).filter(
              (field: string) => field !== 'is_superuser'
            )
          },
        },
      },
      [links.createNewPassword]: {
        path: 'reset-password',
      },
    },
  },
}
