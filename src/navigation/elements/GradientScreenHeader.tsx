import React from 'react'
import { StyleSheet } from 'react-native'
import AdaptiveGradient from '../../ui/gradients/AdaptiveGradient'
import { GradientsProps } from '../../ui/gradients/types'
import ScreenHeader, { ScreenHeaderProps } from './ScreenHeader'

type GradientScreenHeaderProps = {
  gradient?: GradientsProps
} & ScreenHeaderProps

const GradientScreenHeader = ({
  gradient,
  ...props
}: GradientScreenHeaderProps) => {
  return (
    <AdaptiveGradient {...gradient}>
      <ScreenHeader {...props} style={{ line: styles.headerLine }} />
    </AdaptiveGradient>
  )
}

const styles = StyleSheet.create({
  headerLine: {
    backgroundColor: 'transparent',
  },
})

export default GradientScreenHeader
