import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PlanSelectBlock from '../../features/subscriptionPlans/PlanSelectBlock'
import SubscriptionBenefitsBlock from '../../features/subscriptionPlans/SubscriptionBenefitsBlock'
import { subscriptionBenefitsBlockThemedStyles } from '../../features/subscriptionPlans/styles'
import { createThemedStyle, useColors } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import StarsImage from '../../ui/images/StarsImage'

const SelectSubscriptionPlanScreen = () => {
  const { colors, styles } = useThemedStyleList({
    benefitsList: subscriptionBenefitsBlockThemedStyles,
    common: themedStyles,
  })

  return (
    <View>
      <View style={styles.common.background}>
        <ScreenHeader backAvailable title={'Hello'} />
        <View style={styles.common.contentContainer}>
          <View style={styles.common.imageContainer}>
            <StarsImage />
          </View>
          <SubscriptionBenefitsBlock style={styles.benefitsList} />
        </View>
      </View>
      <PlanSelectBlock />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    background: {
      backgroundColor: colors.primary1,
    },
    contentContainer: {
      paddingTop: 24,
      paddingBottom: 27,
      paddingHorizontal: 34,
      width: '100%',
    },
    imageContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 23,
    },
  })
)

export default SelectSubscriptionPlanScreen
