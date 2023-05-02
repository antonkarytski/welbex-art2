import * as Sentry from '@sentry/react-native'
import { SENTRY_DSN } from '../../../constants/app'

export const sentryInit = (availableInDev?: boolean) => {
  if (!availableInDev && __DEV__) return
  Sentry.init({
    dsn: SENTRY_DSN,
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1,
  })
}
