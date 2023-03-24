import { apiManager } from '../../apiManager'
import { Subscription, SubscriptionResponse } from './types'

const endpoint = apiManager.endpoint('subscriptions').protect()

const getAvailable = endpoint.get<Subscription[]>('types/all').unprotect()
const subscribe = endpoint.post<SubscriptionResponse, number>((id) => {
  return { body: { subscription_type_id: id } }
})
const my = endpoint.get<SubscriptionResponse>('my-subscription')
const unsubscribe = endpoint.put<SubscriptionResponse>('unsubscribe')

export const subscriptionsApi = {
  getAvailable,
  subscribe,
  my,
  unsubscribe,
}
