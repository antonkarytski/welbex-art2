import React from 'react'
import ErrorIcon from '../icons/Icon.CrossCircle'
import Note from './Note'
import { NoteProps } from './_types'

const ErrorNote = ({
  label,
  iconColor = '#F76161',
  iconSize = 16,
  labelFontWeight = 400,
  style,
}: NoteProps) => {
  return (
    <Note label={label} style={style} labelFontWeight={labelFontWeight}>
      <ErrorIcon size={iconSize} color={iconColor} style={style?.icon} />
    </Note>
  )
}

export default ErrorNote
