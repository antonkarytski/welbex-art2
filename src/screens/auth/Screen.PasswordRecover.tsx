import React from 'react'
import { useThemedStyleList } from '../../features/themed/hooks'
import Span from '../../ui/Span'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'

export default function PasswordRecover() {
  return (
    <AuthScreenContainer>
      <Span label={'test _ PasswordRecover'} />
    </AuthScreenContainer>
  )
}
