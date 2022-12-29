import { StyleSheet } from 'react-native'
import { InputStyles } from '../input/styles'

export const selectStyles = StyleSheet.create({
  item: {
    position: 'relative',
    paddingVertical: 20,
    paddingRight: 20,
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#F2F4F4',
  },
  listWrapper: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  icon_checkMark: {},
  icon_checkMark__wrapper: {
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
    right: -20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})

export const inputStyles: InputStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
})
