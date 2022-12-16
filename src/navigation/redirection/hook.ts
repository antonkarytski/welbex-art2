import { useEffect } from 'react'
import { useStore } from 'effector-react'
import { useNavigate } from '../index'
import { $redirectionTask, resetRedirectionTask } from './model'

export function useRedirection() {
	const redirectionTask = useStore($redirectionTask)
	const navigate = useNavigate()

	useEffect(() => {
		if (!redirectionTask) return
		resetRedirectionTask()
	},[redirectionTask, navigate])
}