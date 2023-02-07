import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SCREEN_HEIGHT } from '../../lib/device/dimensions'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import { useText } from '../../translations/hook'
import OfferToGetAuthorization from '../auth/OfferToGetAuthorization'

type UnauthorizedProfileProps = {}

const UnauthorizedProfile = ({}: UnauthorizedProfileProps) => {
  const text = useText()

  return (
    <View style={styles.container}>
      <GradientScreenHeader title={text.profile} />
      <ScrollView style={styles.contentContainer}>
        <OfferToGetAuthorization enableDescriptionText />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    padding: SCREEN_HEIGHT / 4.8,
  },
})

export default UnauthorizedProfile
