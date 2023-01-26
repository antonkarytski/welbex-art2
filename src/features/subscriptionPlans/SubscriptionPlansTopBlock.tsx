import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import ScreenTopBlock from '../../navigation/elements/ScreenTopBlock'
import { primaryHeaderThemedStyles } from '../../navigation/elements/styles'
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
    common: primaryHeaderThemedStyles,
  })

  return (
    <ScreenTopBlock
      style={styles.common}
      backAvailable
      title={text.subscription}
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
