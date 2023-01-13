import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import moment from 'moment'
import React, { useLayoutEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { $currentSubscription } from '../../features/profile/model'
import SubscriptionPlansTopBlock from '../../features/subscriptionPlans/SubscriptionPlansTopBlock'
import { getSubscriptionPriceText } from '../../features/subscriptionPlans/helpers'
import { subscriptionCurrentItemThemedStyles } from '../../features/subscriptionPlans/styles'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import { useText } from '../../translations/hook'
import DataRow from '../../ui/DataRow'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import RefreshIcon from '../../ui/icons/Icon.Refresh'
import SubscriptionSelectItem from '../../ui/lists/SubscriptionSelectItem'

const CurrentSubscriptionScreen = ({
  navigation,
}: NativeStackScreenProps<ScreensProps, links.subscriptionSelectPlan>) => {
  const text = useText()
  const currentSubscription = useStore($currentSubscription)
  const { colors, styles } = useThemedStyleList({
    item: subscriptionCurrentItemThemedStyles,
    common: themedStyles,
  })

  useLayoutEffect(() => {
    if (!currentSubscription) {
      navigation.goBack()
      navigation.navigate(links.subscriptionSelectPlan)
    }
  }, [currentSubscription, navigation])

  if (!currentSubscription) return null

  return (
    <View style={styles.common.container}>
      <SubscriptionPlansTopBlock>
        <H2 style={styles.common.header} label={text.myTariff} />
        <View style={styles.common.subscriptionControllersContainer}>
          <View style={styles.common.item}>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(links.subscriptionSelectPlan)
            }}
            style={[styles.common.item, styles.common.refreshItem]}
          >
            <RefreshIcon color={colors.whiteText} />
            <Span
              weight={500}
              style={styles.common.refreshItemText}
              label={text.changeTariff}
            />
          </TouchableOpacity>
        </View>
      </SubscriptionPlansTopBlock>
      <View style={styles.common.contentContainer}>
        <DataRow
          textStyle={styles.common.contentText}
          title={`${text.subscriptionEndDate}:`}
          value={moment(currentSubscription.expiresIn).format('DD.MM.YYYY')}
        />
        <PresetButton
          style={{ marginTop: 'auto' }}
          label={text.unsubscribe}
          onPress={() => {}}
        />
      </View>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 45,
    },
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
    item: {
      flex: 1,
      height: 152,
      maxWidth: 200,
      marginHorizontal: 10,
    },
    refreshItem: {
      backgroundColor: colors.primary2,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    refreshItemText: {
      color: colors.whiteText,
      marginTop: 15,
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: 24,
      flex: 1,
    },
    contentText: {
      color: colors.text,
    },
  })
)

export default CurrentSubscriptionScreen
