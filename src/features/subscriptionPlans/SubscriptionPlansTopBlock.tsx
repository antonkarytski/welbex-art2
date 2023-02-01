import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import ScreenTopBlock from '../../navigation/elements/ScreenTopBlock'
import { themedPrimaryGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'
import { useThemedStyleList } from '../themed/hooks'
import SubscriptionBenefitsBlock from './SubscriptionBenefitsBlock'
import { subscriptionBenefitsBlockThemedStyles } from './styles'

type SubscriptionPlansTopBlockProps = {}

const SubscriptionPlansTopBlock = ({
  children,
}: PropsWithChildren<SubscriptionPlansTopBlockProps>) => {
  const text = useText()
  const { styles } = useThemedStyleList({
    benefitsList: subscriptionBenefitsBlockThemedStyles,
    gradient: themedPrimaryGradient,
  })

  return (
    <ScreenTopBlock
      backAvailable
      title={text.subscription}
      gradientColors={styles.gradient}
    >
      <View style={commonStyles.contentContainer}>
        {children}
        <SubscriptionBenefitsBlock style={styles.benefitsList} />
      </View>
    </ScreenTopBlock>
  )
}

const commonStyles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 27,
    width: '100%',
  },
})

export default SubscriptionPlansTopBlock
