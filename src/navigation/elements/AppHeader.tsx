import React from 'react'
import Sup from '../../ui/Sup'
import ScreenHeader from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type AppHeaderProps = {
  style?: ScreenHeaderStyles
  backAvailable?: boolean
  backArrowColor?: string
}

const AppHeader = ({
  style,
  backAvailable,
  backArrowColor,
}: AppHeaderProps) => {
  return (
    <ScreenHeader
      style={style}
      backAvailable={backAvailable}
      backArrowColor={backArrowColor}
    >
      <Sup style={style?.title} label={'ART'} supLabel={'2'} />
    </ScreenHeader>
  )
}

export default AppHeader
