import React from 'react'
import { StateModel, useStateStore } from 'altek-toolkit'
import Select from './Select'
import { SelectProps } from './types'

type StoredSelectProps<Item> = SelectProps<Item> & {
  model: StateModel<Item>
}

const StoredSelect = <Item,>({ model, ...props }: StoredSelectProps<Item>) => {
  const [selectedItem, setSelectedItem] = useStateStore(model)

  return <Select {...props} value={selectedItem} onSelect={setSelectedItem} />
}

export default StoredSelect
