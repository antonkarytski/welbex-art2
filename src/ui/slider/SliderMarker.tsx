import { MarkerProps } from '@ptomasroos/react-native-multi-slider'
import { View } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import { FONT_MEDIUM } from '../../styles/fonts'
import Span from '../Span'

const CustomMarker = ({ currentValue }: MarkerProps) => {
  return (
    <View style={styles.marker_wrapper}>
      <View style={styles.marker_point} />
      <Span label={currentValue} style={styles.marker_label} />
    </View>
  )
}

const styles = StyleSheet.create({
  marker_wrapper: {
    position: 'relative',
    top: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker_point: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: defaultColors.detailsActive,
    marginBottom: 12,
  },
  marker_label: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONT_MEDIUM,
    color: defaultColors.text,
  },
})

export default CustomMarker
