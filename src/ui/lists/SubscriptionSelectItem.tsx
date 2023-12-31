import React from 'react'
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Subscription } from '../../api/parts/subscriptions/types'
import { FONT_SEMI_BOLD } from '../../styles/fonts'
import Span from '../Span'

export type SubscriptionSelectItemStyles = {
  container?: ViewStyle
  promotionText?: TextStyle
  promotionCard?: ViewStyle
  value?: TextStyle
  measure?: TextStyle
  price?: TextStyle
}

export type SubscriptionSelectItemProps = {
  style?: SubscriptionSelectItemStyles
  onPress?: () => void
  value: number
  measure: string
  price: string
  promotion?: string
}

const SubscriptionSelectItem = ({
  style,
  value,
  price,
  promotion,
  measure,
  onPress,
}: SubscriptionSelectItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.95 : 1}
      onPress={onPress}
      style={[styles.container, style?.container]}
    >
      {promotion ? (
        <View style={styles.promotionContainer}>
          <View style={styles.promotionCard}>
            <Span
              style={[styles.promotionText, style?.promotionText]}
              label={promotion}
            />
          </View>
        </View>
      ) : null}
      <View style={styles.contentContainer}>
        <Span weight={600} style={[styles.count, style?.value]} label={value} />
        <Span style={[styles.measure, style?.measure]} label={measure} />
        <Span style={[styles.price, style?.price]} label={price} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderColor: '#D5DDDC',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  promotionContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  promotionCard: {
    backgroundColor: '#347B81',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
    top: '-50%',
  },
  promotionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONT_SEMI_BOLD,
  },
  contentContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    textAlign: 'center',
    fontSize: 24,
  },
  measure: {
    textAlign: 'center',
    fontSize: 12,
  },
  price: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 8,
  },
})

export default SubscriptionSelectItem
