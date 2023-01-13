import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonCommonThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import RefreshIcon from '../../ui/icons/Icon.Refresh'
import SubscriptionSelectItem from '../../ui/lists/SubscriptionSelectItem'
import { $currentSubscription } from '../profile/model'
import SubscriptionPlansTopBlock from '../subscriptionPlans/SubscriptionPlansTopBlock'
import { getSubscriptionPriceText } from '../subscriptionPlans/helpers'
import { subscriptionCurrentItemThemedStyles } from '../subscriptionPlans/styles'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
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
            value={currentSubscription.monthsAmount}
            measure={text.months}
            price={getSubscriptionPriceText(
              currentSubscription.pricePerMonth,
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
