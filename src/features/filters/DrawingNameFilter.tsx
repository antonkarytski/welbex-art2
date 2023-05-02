import React from 'react'
import { useStateStore } from 'altek-toolkit'
import { useText } from '../../translations/hook'
import Input from '../../ui/input'
import { InputStyles } from '../../ui/input/types'
import { drawingNameFilterModel } from '../gallery/galleryFilter/model'

type DrawingNameFilterProps = {
  styles?: InputStyles
}

const DrawingNameFilter = ({ styles }: DrawingNameFilterProps) => {
  const t = useText()
  const [drawingName, setDrawingName] = useStateStore(drawingNameFilterModel)

  return (
    <Input
      label={t.drawingName}
      value={drawingName}
      onChangeText={setDrawingName}
      styles={styles}
    />
  )
}

export default DrawingNameFilter
