import React from 'react'
import { StateModel, useStateStore } from 'altek-toolkit'
import StatefulSelect from './StatefulSelect'
import { SelectProps } from './types'

type StoredSelectProps<Item> = SelectProps<Item> & {
  model: StateModel<Item>
}

const Select = <Item,>({ model, ...props }: StoredSelectProps<Item>) => {
  const [selectedItem, setSelectedItem] = useStateStore(model)

  return <StatefulSelect {...props} value={selectedItem} onSelect={setSelectedItem} />
}

export default Select
