import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SubscriptionCurrency } from '../../../api/parts/subscriptions/types'
import { useText } from '../../../translations/hook'
import H2 from '../../../ui/H2'
import SubscriptionSelectItem from '../../../ui/lists/SubscriptionSelectItem'
import { $currentSubscription } from '../../profile/model'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import SubscriptionPlansTopBlock from '../plans/SubscriptionPlansTopBlock'
import {
  getSubscriptionMonthsAmountText,
  getSubscriptionPriceText,
} from '../plans/helpers'
import { subscriptionCurrentItemThemedStyles } from '../plans/styles'
import ChangeTariffButton from './ChangeTariffButton'
import { currentSubscriptionControllersStyles } from './styles'

type CurrentSubscriptionTopBlockProps = {}

const CurrentSubscriptionTopBlock = ({}: CurrentSubscriptionTopBlockProps) => {
  const text = useText()
  const currentSubscription = useStore($currentSubscription)
  const { styles, colors } = useThemedStyleList({
    item: subscriptionCurrentItemThemedStyles,
    common: themedStyles,
  })

  if (!currentSubscription) return null

  return (
    <SubscriptionPlansTopBlock>
      <H2 style={styles.common.header} label={text.myTariff} />
      <View style={currentSubscriptionControllersStyles.container}>
        <View style={currentSubscriptionControllersStyles.item}>
          <SubscriptionSelectItem
            style={styles.item}
            value={currentSubscription.type.duration}
            measure={getSubscriptionMonthsAmountText(
              currentSubscription.type.duration,
              text
            )}
            price={getSubscriptionPriceText(
              currentSubscription.type.price,
              SubscriptionCurrency.RUB,
              text
            )}
          />
        </View>
        <ChangeTariffButton
          style={styles.common.refreshButton}
          textStyle={styles.common.refreshButtonText}
          iconColor={colors.whiteText}
        />
      </View>
    </SubscriptionPlansTopBlock>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    header: {
      color: colors.whiteText,
      marginLeft: 20,
      marginBottom: 20,
      marginTop: 24,
    },
    subscriptionControllersContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingHorizontal: 10,
      marginBottom: 26,
    },
    refreshButton: {
      backgroundColor: colors.primary2,
    },
    refreshButtonText: {
      color: colors.whiteText,
    },
  })
)

export default CurrentSubscriptionTopBlock
