import { useStore } from 'effector-react'
import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { $currentSubscription } from '../../features/profile/model'
import CurrentSubscriptionContent from '../../features/subscription/current/CurrentSubscriptionContent'
import CurrentSubscriptionTopBlock from '../../features/subscription/current/CurrentSubscriptionTopBlock'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'

const CurrentSubscriptionScreen = ({
  navigation,
}: ScreenComponentProps<links.subscriptionCurrent>) => {
  const currentSubscription = useStore($currentSubscription)

  useLayoutEffect(() => {
    if (!currentSubscription) {
      navigation.navigate(links.subscriptionSelectPlan)
    }
  }, [currentSubscription, navigation])

  if (!currentSubscription) return null

  return (
    <View style={styles.container}>
      <CurrentSubscriptionTopBlock />
      <CurrentSubscriptionContent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 45,
  },
})

export default CurrentSubscriptionScreen
