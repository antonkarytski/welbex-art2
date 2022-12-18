import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { PropsWithChildren } from 'react'
import { useColors } from '../../features/themed'
import { ScreensProps } from '../types.screenProps'

export const Stack = createNativeStackNavigator<ScreensProps>()

const StackNavigator = ({ children }: PropsWithChildren<any>) => {
  const colors = useColors()

  return (
    <Stack.Navigator
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
