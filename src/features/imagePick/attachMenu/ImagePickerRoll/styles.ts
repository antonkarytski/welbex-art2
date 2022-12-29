import { Dimensions, StyleSheet } from 'react-native'

export const SWIPE_MENU_PADDING = 3
export const CELL_PADDING = 3
export const CELL_SIZE =
  (Dimensions.get('screen').width - SWIPE_MENU_PADDING * 2) / 3
export const CELL_INNER_SIZE = CELL_SIZE - CELL_PADDING * 2

export const cellsStyles = StyleSheet.create({
  container: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    padding: 3,
  },
})
