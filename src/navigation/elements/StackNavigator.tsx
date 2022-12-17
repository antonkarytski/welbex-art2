import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { PropsWithChildren } from 'react'
import { useColors } from '../../features/themed'

export const Stack = createNativeStackNavigator()

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
