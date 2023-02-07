import { links } from '../../navigation/links'
import AddPaymentCardScreen from './Screen.AddPaymentCard'
import CurrentSubscriptionScreen from './Screen.CurrentSubscription'
import DeletePaymentCardScreen from './Screen.DeletePaymentCard'
import PaymentMethodsScreen from './Screen.PaymentMethods'
import SelectSubscriptionPlanScreen from './Screen.SelectSubscriptionPlan'

export const SUBSCRIPTION_ROUTES = [
  {
    name: links.addPaymentCard,
    component: AddPaymentCardScreen,
  },
  {
    name: links.subscriptionCurrent,
    component: CurrentSubscriptionScreen,
  },
  {
    name: links.deletePaymentCard,
    component: DeletePaymentCardScreen,
  },
  {
    name: links.paymentMethod,
    component: PaymentMethodsScreen,
  },
  {
    name: links.subscriptionSelectPlan,
    component: SelectSubscriptionPlanScreen,
  },
]
