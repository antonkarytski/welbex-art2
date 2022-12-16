import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { links } from '../../navigation/links'
import AddPaymentCardScreen from './Screen.AddPaymentCard'
import PaymentMethodsScreen from './Screen.PaymentMethods'
import SubscriptionOptionsScreen from './Screen.SubscriptionOptions'
import UserSubscriptionScreen from './Screen.UserSubscription'

const Stack = createNativeStackNavigator()

export default function SubscriptionRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={links.subscriptionOptions}
        component={SubscriptionOptionsScreen}
      />
      <Stack.Screen
        name={links.userSubscription}
        component={UserSubscriptionScreen}
      />
      <Stack.Screen
        name={links.addPaymentCard}
        component={AddPaymentCardScreen}
      />
      <Stack.Screen
        name={links.paymentMethod}
        component={PaymentMethodsScreen}
      />
    </Stack.Navigator>
  )
}
