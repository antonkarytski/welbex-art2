import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Fn } from 'altek-toolkit'
import { SelectedCircle } from '../SelectedCircle'
import { ImageNode } from '../types'
import { CELL_INNER_SIZE, CELL_PADDING, cellsStyles } from './styles'

export type PickerCellOnPressProps = {
  isSelected: boolean
  unselect: Fn | null
  image: ImageNode
}

type PickerCellProps = {
  image: ImageNode
  onPress: (props: PickerCellOnPressProps) => void
}

const PickerCell = React.memo(({ image, onPress }: PickerCellProps) => {
  const [isSelected, setIsSelected] = useState(false)

  function unselect() {
    setIsSelected(false)
  }

  const pressHandler = () => {
    const nextState = !isSelected
    setIsSelected(nextState)
    onPress({
      isSelected: nextState,
      unselect: nextState ? unselect : null,
      image,
    })
  }

  return (
    <TouchableOpacity
      style={cellsStyles.container}
      onPress={pressHandler}
      activeOpacity={0.9}
    >
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={{ uri: image.uri }}
      />
      {isSelected ? (
        <TouchableOpacity
          style={[styles.image, styles.layout]}
          onPress={pressHandler}
          activeOpacity={0.9}
        />
      ) : null}
      <View style={styles.indicator}>
        <SelectedCircle isSelected={isSelected} />
      </View>
    </TouchableOpacity>
  )
})
export default PickerCell

const styles = StyleSheet.create({
  image: {
    height: '100%',
    borderRadius: 2,
    width: '100%',
  },
  indicator: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  layout: {
    top: CELL_PADDING,
    left: CELL_PADDING,
    width: CELL_INNER_SIZE,
    height: CELL_INNER_SIZE,
    borderRadius: 2,
    backgroundColor: '#00000070',
    position: 'absolute',
  },
})
