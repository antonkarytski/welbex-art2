import React, { PropsWithChildren } from 'react'
import { useColors } from '../../features/themed'
import { links } from '../links'
import { Stack } from './StackNavigator'

type TabStackNavigatorProps = {
  initialRoute?: links
}

const TabStackNavigator = ({
  children,
  initialRoute,
}: PropsWithChildren<TabStackNavigatorProps>) => {
  const colors = useColors()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.screenBackground,
        },
      }}
      initialRouteName={initialRoute}
    >
      {children}
    </Stack.Navigator>
  )
}

export default TabStackNavigator
