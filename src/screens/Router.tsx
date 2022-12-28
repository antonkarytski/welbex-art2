import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { $isAuth } from '../features/authServices/model'
import { useNavigate } from '../navigation'
import StackNavigator, { Stack } from '../navigation/elements/StackNavigator'
import { links } from '../navigation/links'
import MainTabsRouter from './Tabs.Main'
import AuthScreenRouter from './auth/Router.Auth'

const Router = React.memo(() => {
  const isAuth = useStore($isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate(links.mainTabs)
  }, [isAuth, navigate])

  return (
    <StackNavigator>
      {!isAuth && (
        <Stack.Screen name={links.authRouter} component={AuthScreenRouter} />
      )}
      <Stack.Screen name={links.mainTabs} component={MainTabsRouter} />
    </StackNavigator>
  )
})

export default Router
