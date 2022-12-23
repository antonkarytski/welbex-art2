import React from 'react'
import { useThemedStyleList } from '../../features/themed/hooks'
import Span from '../../ui/Span'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'

export default function Verification() {
  return (
    <AuthScreenContainer>
      <Span>Verification</Span>
    </AuthScreenContainer>
  )
}
