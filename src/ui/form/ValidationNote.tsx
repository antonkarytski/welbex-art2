import React from 'react'
import ErrorNote from './ErrorNote'
import SuccessNote from './SuccessNote'
import { NoteStyles } from './_types'

export type ValidationNoteIconColors = {
  success?: string
  error?: string
}

type ValidationNoteProps = {
  isValid?: boolean | null
  validLabel?: string
  invalidLabel?: string
  iconColors?: ValidationNoteIconColors
  style?: NoteStyles
}

const ValidationNote = ({
  isValid,
  validLabel = '',
  invalidLabel = '',
  iconColors,
  style,
}: ValidationNoteProps) => {
  if (isValid === true)
    return (
      <SuccessNote
        style={style}
        label={validLabel}
        iconColor={iconColors?.success}
      />
    )

  if (isValid === false)
    return (
      <ErrorNote
        style={style}
        label={invalidLabel}
        iconColor={iconColors?.error}
      />
    )

  return null
}

export default ValidationNote
