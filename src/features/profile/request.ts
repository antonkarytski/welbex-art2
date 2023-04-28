import { attach, createEffect, createEvent, sample } from 'effector'
import { seconds } from 'altek-toolkit'
import { api } from '../../api'
import { prepareMyProfile } from '../user/helpers'
import { setMyProfile } from './model'

const REFRESH_PROFILE_INTERVAL = seconds(20)
const lastLimitedRefreshRef = {
  current: 0,
}

export const meRequest = attach({
  effect: api.users.me,
})
meRequest.done.watch(({ result }) => {
  lastLimitedRefreshRef.current = Date.now()
  setMyProfile(prepareMyProfile(result))
})

export const refreshProfile = createEffect(meRequest)
export const refreshProfileLimited = createEvent()
sample({
  source: {
    isRefreshing: refreshProfile.pending,
    isLoading: meRequest.pending,
  },
  clock: refreshProfileLimited,
  fn: ({ isRefreshing, isLoading }) => isRefreshing || isLoading,
}).watch((isPending) => {
  const now = Date.now()
  if (
    isPending ||
    now - lastLimitedRefreshRef.current < REFRESH_PROFILE_INTERVAL
  )
    return
  lastLimitedRefreshRef.current = now
  return refreshProfile()
})
