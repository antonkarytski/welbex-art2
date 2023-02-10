import NetInfo from '@react-native-community/netinfo'
import { createEvent, restore } from 'effector'

export const setIsConnected = createEvent<boolean>()

export const $isConnected = restore(setIsConnected, true)

NetInfo.fetch().then(({ isConnected }) => {
  setIsConnected(!!isConnected)
})

NetInfo.addEventListener((state) => {
  setIsConnected(!!state.isConnected)
})
