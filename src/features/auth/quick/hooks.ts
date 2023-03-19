import { useStore } from 'effector-react'
import { noop } from '../../../lib/helpers'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { $quickAuthAbsentFields } from './model'
import { completeQuickAuth } from './request'

export function useQuickAuthNextStep(currentStep: links) {
  const navigate = useNavigate()
  const quickAuthFilter = useStore($quickAuthAbsentFields)

  function nextStep() {
    if (!quickAuthFilter) return completeQuickAuth().catch(noop)
    switch (currentStep) {
      case links.authSubmit: {
        if (quickAuthFilter.country) return navigate(links.countrySelection)
        if (quickAuthFilter.phone_number) return navigate(links.phoneEnter)
        return completeQuickAuth().catch(noop)
      }
      case links.countrySelection: {
        if (quickAuthFilter.phone_number) return navigate(links.phoneEnter)
        return completeQuickAuth().catch(noop)
      }
      case links.phoneEnter: {
        return completeQuickAuth().catch(noop)
      }
    }
  }

  return nextStep
}
