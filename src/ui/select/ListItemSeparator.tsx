import { View } from 'native-base'
import React from 'react'
import { selectStyles } from './styles'

const ListItemSeparator = React.memo(() => {
  return <View style={selectStyles.itemSeparator} />
})

export default ListItemSeparator
