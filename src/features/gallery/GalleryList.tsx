import React from 'react'
import GalleryEmptyComponent from './GalleryEmptyComponent'
import GalleryListBase from './GalleryListBase'
import { GalleryType } from './types'

type GalleryListProps = {
  type: GalleryType
}

const GalleryList = ({ type }: GalleryListProps) => {
  return (
    <GalleryListBase
      type={type}
      getListOnMount={true}
      refreshEnabled
      ListEmptyComponent={<GalleryEmptyComponent />}
    />
  )
}

export default GalleryList
