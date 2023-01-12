import React from 'react'
import { StyleSheet, View } from 'react-native'
import PlanSelectBlock from '../../features/subscriptionPlans/PlanSelectBlock'
import SelectSubscriptionPlanButton from '../../features/subscriptionPlans/SelectSubscriptionPlanButton'
import SubscriptionPlansHeader from '../../features/subscriptionPlans/SubscriptionPlansHeader'
import PresetButton from '../../ui/buttons/PresetButton'

const SelectSubscriptionPlanScreen = () => {
  return (
    <View>
      <SubscriptionPlansHeader style={styles.header} />
      <PlanSelectBlock />
      <View style={styles.buttonContainer}>
        <SelectSubscriptionPlanButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
})

export default SelectSubscriptionPlanScreen
