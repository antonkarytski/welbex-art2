import { attach, createEffect, createEvent, createStore } from 'effector'
import { api } from '../../api'
import { createNextPageModel } from '../../api/pagination'
import { WinnerItem } from '../../api/parts/categories/types'

export const WINNERS_PAGE_SIZE = 10

export const { $nextPage, setNextPage } = createNextPageModel()

export const getWinners = attach({
  source: $nextPage,
  effect: createEffect((nextPage: number | null) => {
    if (!nextPage) throw new Error('Next page is null')
    console.log('____nextPage____', nextPage)

    return api.categories.winners({
      page: nextPage,
      size: WINNERS_PAGE_SIZE,
    })
  }),
})

const setWinners = createEvent<WinnerItem[]>()
export const $winners = createStore<WinnerItem[]>([]).on(
  setWinners,
  (state, payload) => [...state, ...payload]
)

getWinners.done.watch(({ result }) => {
  const { items, page, size, total } = result
  setNextPage({ page, size, total })
  console.log('____getWinners_____', items)
  setWinners(items)
})

getWinners.fail.watch(({ error }) => {
  console.log('____error____', error)
})

export const $isLoading = getWinners.pending
