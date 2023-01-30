import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import ScreenTopBlock from '../../navigation/elements/ScreenTopBlock'
import { primaryHeaderThemedStyles } from '../../navigation/elements/styles'
import { useText } from '../../translations/hook'
import { primaryGradientPreset } from '../../ui/grdients/styles'
import { useThemedStyleList } from '../themed/hooks'
import SubscriptionBenefitsBlock from './SubscriptionBenefitsBlock'
import { subscriptionBenefitsBlockThemedStyles } from './styles'

type SubscriptionPlansTopBlockProps = {}

const SubscriptionPlansTopBlock = ({
  children,
}: PropsWithChildren<SubscriptionPlansTopBlockProps>) => {
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    benefitsList: subscriptionBenefitsBlockThemedStyles,
    common: primaryHeaderThemedStyles,
  })
  const gradient = primaryGradientPreset(colors)

  return (
    <ScreenTopBlock
      style={styles.common}
      backAvailable
      title={text.subscription}
      gradientStartColor={gradient.start}
      gradientEndColor={gradient.end}
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
