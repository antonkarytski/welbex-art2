import { createStore, createEvent } from 'effector'
import { ILogInForm } from './types'

export const initialLogInFormState: ILogInForm = {
	email: '',
	password: '',
}

export const setField = createEvent<{ key: keyof ILogInForm, value: string }>()

export const $logInForm = createStore<ILogInForm>(initialLogInFormState)
.on(setField, (store, { key, value }) => ({
	...store,
	[key]: value,
}) )
