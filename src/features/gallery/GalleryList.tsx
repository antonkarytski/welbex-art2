import { useStore } from 'effector-react'
import React from 'react'
import Span from '../../ui/Span'
import { $isAuth } from '../auth/model'
import GalleryListBase from './GalleryListBase'
import { GalleryType } from './types'

type GalleryListProps = {
  type: GalleryType
}

const GalleryList = ({ type }: GalleryListProps) => {
  const isAuth = useStore($isAuth)

  return (
    <GalleryListBase
      type={type}
      getListOnMount={true}
      ListEmptyComponent={
        // TODO: Component when design will ready
        <Span
          label={
            !isAuth && type === GalleryType.FOLLOWING
              ? 'You need to login to view this gallery'
              : 'No drawings yet'
          }
        />
      }
    />
  )
}

export default GalleryList
