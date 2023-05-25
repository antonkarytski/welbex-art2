import { LinkingOptions } from '@react-navigation/native'
import { IS_IOS } from '../../lib/helpers/native/constants'
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
              (field: string) =>
                field !== 'is_superuser' && (!IS_IOS || field !== 'DOB')
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
