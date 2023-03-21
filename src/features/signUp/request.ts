import { attach } from 'effector'
import { api } from '../../api'
import { apiManager } from '../../api/apiManager'
import { setMyProfile } from '../profile/model'
import { signUpUserResponseToNewUser } from '../user/helpers'
import { convertSignUpFormToSignUpBody } from './helpers'
import { $signUpFormData } from './model'

export const signUp = attach({
  source: $signUpFormData,
  mapParams: (_: void, props) => ({
    ...convertSignUpFormToSignUpBody(props),
    is_manager: false,
    is_superuser: false,
  }),
  effect: api.users.signUp,
})

signUp.done.watch(({ result }) => {
  apiManager.token.set({
    access: result.tokens.access_token,
    refresh: result.tokens.refresh_token,
  })
  const myNewProfile = signUpUserResponseToNewUser(result.user)
  setMyProfile(myNewProfile)
})
