import React from 'react'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import CrossButton from './buttons/Button.Cross'
import SearchIcon from './icons/Icon.Search'
import Input from './input'
import { InputStyles } from './input/types'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  style?: InputStyles
  onLayout?: (e: LayoutChangeEvent) => void
}

const SearchInput = ({
  value,
  onChange,
  style,
  onLayout,
}: SearchInputProps) => {
  return (
    <Input
      value={value}
      onChangeText={onChange}
      InputPseudoBefore={<SearchIcon />}
      InputPseudoAfter={
        value && (
          <CrossButton
            style={styles.closeButton}
            onPress={() => onChange('')}
          />
        )
      }
      styles={style}
      onLayout={onLayout}
    />
  )
}

const styles = StyleSheet.create({
  closeButton: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
})

export default SearchInput
