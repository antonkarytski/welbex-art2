import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import LockIcon from '../../ui/icons/Icon.Lock'

type PaymentSecuredTextProps = {
  style?: StyleProp<ViewStyle>
}

const PaymentSecuredText = ({ style }: PaymentSecuredTextProps) => {
  const text = useText()

  return (
    <View style={[styles.container, style]}>
      <LockIcon />
      <Span label={text.cardInfoSecure} style={styles.text} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
})

export default PaymentSecuredText
