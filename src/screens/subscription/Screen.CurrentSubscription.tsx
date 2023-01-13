import React from 'react'
import { Text, View } from 'react-native'
import SubscriptionPlansHeader from '../../features/subscriptionPlans/SubscriptionPlansHeader'
import SubscriptionSelectItem from '../../ui/lists/SubscriptionSelectItem'

const CurrentSubscriptionScreen = () => {
  return (
    <View>
      <SubscriptionPlansHeader>
        <SubscriptionSelectItem value={'ff'} measure={'fdfs'} price={'dsfsd'} />
      </SubscriptionPlansHeader>
    </View>
  )
}

export default CurrentSubscriptionScreen
