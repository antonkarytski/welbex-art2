import React from 'react'
import { useThemedStyleList } from '../../features/themed/hooks'
import Span from '../../ui/Span'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'

const PasswordEnterScreen = () => {
  return (
    <AuthScreenContainer>
      <Span label={'test'} />
    </AuthScreenContainer>
  )
}

export default PasswordEnterScreen
