import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import PlanSelectBlock from '../../features/subscription/plans/PlanSelectBlock'
import SelectSubscriptionPlanButton from '../../features/subscription/plans/SelectSubscriptionPlanButton'
import SubscriptionPlansTopBlock from '../../features/subscription/plans/SubscriptionPlansTopBlock'
import StarsImage from '../../ui/images/StarsImage'

const SelectSubscriptionPlanScreen = () => {
  return (
    <ScrollView bounces={false}>
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
    paddingBottom: 24,
    marginBottom: 30,
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
