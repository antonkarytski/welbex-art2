import React, { PropsWithChildren } from 'react'
import { links } from '../links'
import { Stack } from './StackNavigator'

type TabStackNavigatorProps = {
  initialRoute?: links
}

const TabStackNavigator = ({
  children,
  initialRoute,
}: PropsWithChildren<TabStackNavigatorProps>) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRoute}
    >
      {children}
    </Stack.Navigator>
  )
}

export default TabStackNavigator
