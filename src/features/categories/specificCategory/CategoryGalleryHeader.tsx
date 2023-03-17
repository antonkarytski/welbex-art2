import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SpecificCategoryResponse } from '../../../api/parts/categories/types'
import { useText } from '../../../translations/hook'
import H2 from '../../../ui/H2'
import SearchInput from '../../../ui/SearchInput'
import CategoryDescription from './CategoryDescription'
import {
  $categoryArtsSearchString,
  resetCategoryArtsSearchString,
  setCategoryArtsSearchString,
} from './model'

type CategoryGalleryProps = {
  item: SpecificCategoryResponse
  header?: React.ReactNode
}

const CategoryGalleryHeader = ({ header, item }: CategoryGalleryProps) => {
  const text = useText()
  const searchString = useStore($categoryArtsSearchString)

  useEffect(() => {
    resetCategoryArtsSearchString()
  }, [item.id])

  return (
    <>
      {header}
      <CategoryDescription item={item} />
      <H2 label={text.participantsDrawings} />
      <SearchInput
        value={searchString}
        onChange={setCategoryArtsSearchString}
        style={searchInputStyles}
      />
    </>
  )
}

const searchInputStyles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
})

export default CategoryGalleryHeader
