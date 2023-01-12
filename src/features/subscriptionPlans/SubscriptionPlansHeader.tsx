import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { useText } from '../../translations/hook'
import StarsImage from '../../ui/images/StarsImage'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import SubscriptionBenefitsBlock from './SubscriptionBenefitsBlock'
import { subscriptionBenefitsBlockThemedStyles } from './styles'

type SubscriptionPlansHeaderProps = {
  style?: StyleProp<ViewStyle>
}

const SubscriptionPlansHeader = ({ style }: SubscriptionPlansHeaderProps) => {
  const text = useText()
  const { styles } = useThemedStyleList({
    benefitsList: subscriptionBenefitsBlockThemedStyles,
    common: themedStyles,
  })

  return (
    <View style={[styles.common.container, style]}>
      <ScreenHeader backAvailable title={text.subscription} />
      <View style={styles.common.contentContainer}>
        <View style={styles.common.imageContainer}>
          <StarsImage />
        </View>
        <SubscriptionBenefitsBlock style={styles.benefitsList} />
      </View>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
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

export default SubscriptionPlansHeader
