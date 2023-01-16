import React from 'react'
import SuccessIcon from '../icons/Icon.Success'
import Note from './Note'
import { NoteProps } from './_types'

const SuccessNote = ({
  label,
  iconColor = '#439F6E',
  iconSize = 16,
  style,
  labelFontWeight,
}: NoteProps) => {
  return (
    <Note label={label} style={style} labelFontWeight={labelFontWeight}>
      <SuccessIcon size={iconSize} color={iconColor} />
    </Note>
  )
}

export default SuccessNote
