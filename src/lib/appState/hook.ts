import { useEffect, useRef, useCallback } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useStore } from 'effector-react'
import { Fn } from '../../types'
import { noop } from '../helpers'
import { $isInForeground } from './model'

type TOnAppStateChange = Fn<void | Fn>

function isAppInForeground(appState: AppStateStatus, nexApptState: AppStateStatus) {
	return appState.match(/inactive|background/) && nexApptState === 'active'
}

function isAppInBackground(appState: AppStateStatus, nexApptState: AppStateStatus) {
	return  appState === 'active' &&  nexApptState.match(/inactive|background/) 
}

export function useAppStateChange(onForeground: TOnAppStateChange) {
	const appState = useRef(AppState.currentState)
	const onForegroundRef = useRef(onForeground || noop)
	const onBackgroundRef = useRef<Fn | void>()
	onForegroundRef.current = onForeground || noop
	
	const appStateChangeHandler = useCallback((nextAppState: AppStateStatus) => {
		if (isAppInForeground(appState.current, nextAppState)) {
			onBackgroundRef.current = onForegroundRef.current()
		}
		if (isAppInBackground(appState.current, nextAppState)) { 
			if(onBackgroundRef.current) onBackgroundRef.current()
		}
		appState.current = nextAppState
	},[])


	useEffect(() => {
		const subscription = AppState.addEventListener('change', appStateChangeHandler)
		return subscription.remove
	}, [appStateChangeHandler])
}

export function useAppState() {
	const isInForeground = useStore($isInForeground)
	return { isInForeground }
}
