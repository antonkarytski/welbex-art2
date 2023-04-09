import { MarkerProps } from '@ptomasroos/react-native-multi-slider'
import React from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import { FONT_MEDIUM } from '../../styles/fonts'
import Span from '../Span'

type CustomMarkerProps = MarkerProps & {
  onLayout?: (e: LayoutChangeEvent) => void
  onMarkerPointLayout?: (e: LayoutChangeEvent) => void
}

const CustomMarker = ({
  currentValue,
  onLayout,
  onMarkerPointLayout,
}: CustomMarkerProps) => {
  return (
    <View style={styles.marker_wrapper} onLayout={onLayout}>
      <View style={styles.marker_point} onLayout={onMarkerPointLayout} />
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
