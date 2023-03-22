import React from 'react'
import ErrorNote from './ErrorNote'
import SuccessNote from './SuccessNote'

export type ValidationNoteIconColors = {
  success?: string
  error?: string
}

type ValidationNoteProps = {
  isValid?: boolean | null
  validLabel?: string
  invalidLabel?: string
  iconColors?: ValidationNoteIconColors
}

const ValidationNote = ({
  isValid,
  validLabel = '',
  invalidLabel = '',
  iconColors,
}: ValidationNoteProps) => {
  if (isValid === true)
    return <SuccessNote label={validLabel} iconColor={iconColors?.success} />

  if (isValid === false)
    return <ErrorNote label={invalidLabel} iconColor={iconColors?.error} />

  return null
}

export default ValidationNote
