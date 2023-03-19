import { useStore } from 'effector-react'
import { useCallback } from 'react'
import { noop } from '../../../lib/helpers'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { $isOnQuickAuth, $quickAuthAbsentFields } from './model'
import { completeQuickAuth } from './request'

export function useQuickAuthNextStep(currentStep: links) {
  const navigate = useNavigate()
  const isActive = useStore($isOnQuickAuth)
  const quickAuthFilter = useStore($quickAuthAbsentFields)

  const nextStep = useCallback(() => {
    const end = () => {
      completeQuickAuth().catch(noop)
      navigate(links.home)
    }

    if (!quickAuthFilter) return end()
    switch (currentStep) {
      case links.authSubmit: {
        if (quickAuthFilter.country) return navigate(links.countrySelection)
        if (quickAuthFilter.phone_number) return navigate(links.phoneEnter)
        break
      }
      case links.countrySelection: {
        if (quickAuthFilter.phone_number) return navigate(links.phoneEnter)
        break
      }
      case links.verification: {
        break
      }
    }
    end()
  }, [navigate, quickAuthFilter, currentStep])

  return { nextStep, isActive }
}
