import {
  Store,
  createEffect,
  createEvent,
  createStore,
  merge,
  restore,
  sample,
} from 'effector'
import { debounce } from 'patronum'
import { FnExt, StateModel } from 'altek-toolkit'
import { filterArrayBySearchString } from '../helpers/array'

export type SearchFxParams<T> = {
  searchString: string
  initialList?: T[]
}

export type CreateListModelParams<T> = {
  searchFn?: FnExt<string, T[]>
  filterExtractorName?: keyof T & string
  filterExtractor?: FnExt<T, string>
}

export type SearchableListModel<T> = {
  searchStringModel: StateModel<string>
  initialListModel: StateModel<T[]>
  $filteredList: Store<T[]>
}

export const createSearchableListModel = <T extends Record<string, any>>(
  props: CreateListModelParams<T>
) => {
  const { searchFn, filterExtractorName = 'name', filterExtractor } = props

  const setSearchString = createEvent<string>()
  const $searchString = restore(setSearchString, '')
  const debounceSearch = debounce({ source: setSearchString, timeout: 400 })

  const $filteredList = createStore<T[]>([])

  const setInitialList = createEvent<T[]>()
  const $initialList = restore(setInitialList, [])

  const searchFx = createEffect<SearchFxParams<T>, T[]>(async (params) => {
    const { searchString, initialList } = params
    if (searchFn) {
      return await searchFn(searchString)
    }
    if (initialList) {
      return filterArrayBySearchString(
        initialList,
        searchString,
        filterExtractor,
        filterExtractorName
      )
    }
    return []
  })

  sample({
    clock: merge([debounceSearch, setInitialList]),
    source: { searchString: $searchString, initialList: $initialList },
    target: searchFx,
  })

  $filteredList.on(searchFx.doneData, (_, payload) => payload)

  const searchStringModel = {
    $state: $searchString,
    set: setSearchString,
    reset: () => setSearchString(''),
  }

  const initialListModel = {
    $state: $initialList,
    set: setInitialList,
    reset: () => setInitialList([]),
  }

  return { searchStringModel, initialListModel, $filteredList }
}
