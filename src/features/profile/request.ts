import { attach } from 'effector'
import { api } from '../../api'
import { prepareMyProfile } from '../user/helpers'
import { setMyProfile } from './model'

export const meRequest = attach({
  effect: api.users.me,
})
meRequest.done.watch(({ result }) => {
  setMyProfile(prepareMyProfile(result))
})
