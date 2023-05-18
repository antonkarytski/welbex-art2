import { ApiError } from '@heyheyjude/toolkit'
import { attach } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { api } from '../../api'
import { apiManager } from '../../api/apiManager'
import { noop } from '../../lib/helpers'
import { tokenResponseToTokens } from '../auth/logIn/helpers.token'
import { setMyProfile } from '../profile/model'
import { loadAvailableCategories } from '../profile/model.availableCategories'
import { signUpUserResponseToNewUser } from '../user/helpers'
import { convertSignUpFormToSignUpBody } from './helpers'
import { $signUpFormData, resetSignUpFormData } from './model'

export const signUp = attach({
  source: $signUpFormData,
  mapParams: (_: void, props) => ({
    ...convertSignUpFormToSignUpBody(props),
    is_manager: false,
    is_superuser: false,
  }),
  effect: api.users.signUp,
})

export const signUpErrorModel = createStateModel<null | string>(null)

signUp.done.watch(({ result }) => {
  resetSignUpFormData()
  loadAvailableCategories().catch(noop)
  apiManager.token.set(tokenResponseToTokens(result.tokens))
  const myNewProfile = signUpUserResponseToNewUser(result.user)
  setMyProfile(myNewProfile)
  signUpErrorModel.reset()
})

signUp.fail.watch(({ error }) => {
  const errorDetails = (error as ApiError).data?.detail
  if (!errorDetails) return
  if (Array.isArray(errorDetails)) {
    signUpErrorModel.set(errorDetails.map(({ msg }) => msg).join(', '))
    return
  }
  signUpErrorModel.set(errorDetails)
})
