import { SubscriptionStatus } from '../../api/parts/subscriptions/types'
import { MyProfile } from '../../api/parts/users/types'

export function isActiveSubscription(myProfile: MyProfile | null) {
  return (
    myProfile?.subscription &&
    myProfile.subscription.status_id === SubscriptionStatus.ACTIVE
  )
}
