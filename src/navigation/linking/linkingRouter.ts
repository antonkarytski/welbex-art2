import { LinkingOptions } from '@react-navigation/native'
import { links } from '../links'
import { ScreensProps } from '../types.screenProps'

const EXCLUDED_FIELDS = ['is_superuser', 'DOB']
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
              (field: string) => !EXCLUDED_FIELDS.includes(field)
            )
          },
        },
      },
      [links.createNewPassword]: {
        path: 'reset-password',
      },
      [links.successfulPaymentInfoMessage]: {
        path: 'subscription',
      },
    },
  },
}
