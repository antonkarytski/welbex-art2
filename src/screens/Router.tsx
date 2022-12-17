import React from 'react'
import StackNavigator from '../navigation/elements/StackNavigator'
import { useText } from '../translations/hook'

const MainScreenRouter = React.memo(() => {
  const text = useText()

  return <StackNavigator></StackNavigator>
})

export default MainScreenRouter
