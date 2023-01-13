import React from 'react'
import { StyleSheet, View } from 'react-native'
import PlanSelectBlock from '../../features/subscriptionPlans/PlanSelectBlock'
import SelectSubscriptionPlanButton from '../../features/subscriptionPlans/SelectSubscriptionPlanButton'
import SubscriptionPlansHeader from '../../features/subscriptionPlans/SubscriptionPlansHeader'
import StarsImage from '../../ui/images/StarsImage'

const SelectSubscriptionPlanScreen = () => {
  return (
    <View>
      <SubscriptionPlansHeader>
        <StarsImage style={styles.image} />
      </SubscriptionPlansHeader>
      <PlanSelectBlock style={styles.selectBlock} />
      <View style={styles.buttonContainer}>
        <SelectSubscriptionPlanButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  selectBlock: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 23,
  },
})

export default SelectSubscriptionPlanScreen
