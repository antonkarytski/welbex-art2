import { apiManager } from '../../apiManager'
import {
  Subscription,
  SubscriptionResponse,
  SubscriptionsFilter,
  ToPaymentResponse,
} from './types'

const endpoint = apiManager.endpoint('subscriptions').protect()

const getAvailable = endpoint
  .get<Subscription[], SubscriptionsFilter | void>('types/all')
  .unprotect()

const subscribe = endpoint.post<ToPaymentResponse, number>((id) => {
  return { body: { subscription_type_id: id } }
})
const my = endpoint.get<SubscriptionResponse | null>('my-subscription')
const unsubscribe = endpoint.put<SubscriptionResponse>('unsubscribe')

export const subscriptionsApi = {
  getAvailable,
  subscribe,
  my,
  unsubscribe,
}
