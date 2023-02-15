import React from 'react'
import CrossButton from '../buttons/Button.Cross'
import SearchIcon from '../icons/Icon.Search'
import Input from '../input'
import { InputStyles } from '../input/types'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  style: InputStyles
}

const SearchInput = ({ value, onChange, style }: SearchInputProps) => {
  return (
    <Input
      value={value}
      onChangeText={onChange}
      InputPseudoBefore={<SearchIcon />}
      InputPseudoAfter={<CrossButton onPress={() => onChange('')} />}
      styles={style}
    />
  )
}

export default SearchInput
