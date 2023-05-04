import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Span from '../Span'
import { inputStyles } from '../input/styles'
import { InputStyles, MergedInputStyles } from '../input/types'

type ButtonInputLikeProps = {
  style?: InputStyles | MergedInputStyles
  label?: string
  onPress: () => void
}

const ButtonInputLike = ({ style, label, onPress }: ButtonInputLikeProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        inputStyles.input,
        inputStyles.border,
        styles.input,
        style?.input,
      ]}
    >
      <Span label={label} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
})

export default ButtonInputLike
