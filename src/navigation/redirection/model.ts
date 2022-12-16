import { createEvent, restore } from 'effector'
import { links } from '../links'

type TRedirectionTask = {
  link: links
}

export const setRedirectionTask = createEvent<TRedirectionTask>()
export const resetRedirectionTask = createEvent()
export const $redirectionTask = restore(setRedirectionTask, null).reset(
  resetRedirectionTask
)
