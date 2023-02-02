import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import PlanSelectBlock from '../../features/subscriptionPlans/PlanSelectBlock'
import SelectSubscriptionPlanButton from '../../features/subscriptionPlans/SelectSubscriptionPlanButton'
import SubscriptionPlansTopBlock from '../../features/subscriptionPlans/SubscriptionPlansTopBlock'
import StarsImage from '../../ui/images/StarsImage'

const SelectSubscriptionPlanScreen = () => {
  return (
    <ScrollView>
      <SubscriptionPlansTopBlock>
        <StarsImage style={styles.image} />
      </SubscriptionPlansTopBlock>
      <PlanSelectBlock style={styles.selectBlock} />
      <View style={styles.buttonContainer}>
        <SelectSubscriptionPlanButton />
      </View>
    </ScrollView>
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
    paddingTop: 24,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 23,
  },
})

export default SelectSubscriptionPlanScreen
