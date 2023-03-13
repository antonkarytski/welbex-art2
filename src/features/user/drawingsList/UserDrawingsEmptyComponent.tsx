import React from 'react'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'

const UserDrawingsEmptyComponent = () => {
  // TODO: rework when design will ready
  const t = useText()
  return <Span label={'No drawings yet'} />
}

export default UserDrawingsEmptyComponent
