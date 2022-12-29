import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { PropsWithChildren } from 'react'
import { useColors } from '../../features/themed'
import { links } from '../links'
import { ScreensProps } from '../types.screenProps'

type StackNavigatorProps = {
  initialScreen?: links
}

export const Stack = createNativeStackNavigator<ScreensProps>()

const StackNavigator = ({
  children,
  initialScreen,
}: PropsWithChildren<StackNavigatorProps>) => {
  const colors = useColors()

  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.screenBackground,
        },
      }}
    >
      {children}
    </Stack.Navigator>
  )
}

export default StackNavigator
