import React from 'react'
import { AppRegistry } from 'react-native'
import App from './App'
import { name } from './app.json'

export function HeadlessCheck({ isHeadless }) {
  if (isHeadless) return null
  return <App />
}
AppRegistry.registerComponent(name, () => HeadlessCheck)
