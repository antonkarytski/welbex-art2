import BaseMultiSlider, {
  MarkerProps,
  MultiSliderProps,
} from '@ptomasroos/react-native-multi-slider'
import { View } from 'native-base'
import React, { useState } from 'react'
import {
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { StateModel, useStateStore, useToggle } from 'altek-toolkit'
import { defaultColors } from '../../features/themed/theme'
import { getWidth } from '../../lib/device/dimensions'
import { FONT_MEDIUM } from '../../styles/fonts'
import Span from '../Span'
import SliderMarker from './SliderMarker'

type CustomMultiSliderProps = {
  label?: string
  model: StateModel<number[]>
  style?: {
    wrapper: StyleProp<ViewStyle>
  }
} & MultiSliderProps

const sliderWidth = getWidth({ paddingSize: 32 })

const MultiSlider = ({
  model,
  label,
  style,
  ...props
}: CustomMultiSliderProps) => {
  const [isScrollEnabled, toggleScrollEnabled] = useToggle(true)
  const [values, setValues] = useStateStore(model)
  const [markerHeight, setMarkerHeight] = useState(30)
  const [markerPointHeight, setMarkerPointHeight] = useState(20)

  const onMarkerLayout = (e: LayoutChangeEvent) => {
    setMarkerHeight(e.nativeEvent.layout.height)
  }
  const onMarkerPointLayout = (e: LayoutChangeEvent) => {
    setMarkerPointHeight(e.nativeEvent.layout.height)
  }

  const Marker = (markerProps: MarkerProps) => (
    <SliderMarker
      {...markerProps}
      onLayout={onMarkerLayout}
      onMarkerPointLayout={onMarkerPointLayout}
    />
  )

  return (
    <View style={style?.wrapper}>
      {label && <Span label={label} style={styles.label} />}
      <ScrollView scrollEnabled={isScrollEnabled} style={styles.scrollView}>
        <BaseMultiSlider
          values={values}
          onValuesChange={setValues}
          sliderLength={sliderWidth}
          enabledTwo={true}
          isMarkersSeparated={true}
          step={1}
          onValuesChangeStart={toggleScrollEnabled}
          onValuesChangeFinish={toggleScrollEnabled}
          customMarkerLeft={Marker}
          customMarkerRight={SliderMarker}
          trackStyle={styles.track}
          selectedStyle={styles.track__selected}
          containerStyle={{
            ...styles.track_container,
            height: markerHeight,
            paddingTop: markerPointHeight / 2,
          }}
          {...props}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 12,
    color: defaultColors.textGrey,
    fontFamily: FONT_MEDIUM,
  },
  track: {
    backgroundColor: defaultColors.detailsInactive,
    height: 1,
  },
  track_container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  track__selected: {
    backgroundColor: defaultColors.detailsActive,
  },
  scrollView: { height: 70 },
})

export default MultiSlider
