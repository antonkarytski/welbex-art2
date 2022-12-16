import { AppState, AppStateStatus } from 'react-native'
import { createEvent, createStore } from 'effector'

export const setIsInForeGround = createEvent<boolean>()
export const $isInForeground = createStore(AppState.currentState === 'active')

$isInForeground.on(setIsInForeGround, (_, payload) => payload)

AppState.addEventListener('change', (nextAppState: AppStateStatus) => setIsInForeGround(nextAppState === 'active') )