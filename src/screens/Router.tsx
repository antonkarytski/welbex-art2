import React from 'react'
import StackNavigator, { Stack } from '../navigation/elements/StackNavigator'
import { links } from '../navigation/links'
import { useText } from '../translations/hook'
import MainTabsRouter from './Tabs.Main'

const Router = React.memo(() => {
  const text = useText()

  return (
    <StackNavigator>
      <Stack.Screen name={links.mainTabs} component={MainTabsRouter} />
    </StackNavigator>
  )
})

export default Router
