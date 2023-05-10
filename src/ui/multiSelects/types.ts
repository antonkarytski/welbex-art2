import { ReactNode } from 'react'
import { Fn, StateModel } from 'altek-toolkit'
import { SearchableListModel } from '../../lib/models/model.search'
import { FnExt } from '../../types'
import { SearchableListStyles } from '../SearchableList'
import { InputStyles } from '../input/types'
import {
  DropdownSelectPreset,
  DropdownSelectStyles,
  SelectProps,
  SelectStyles,
} from '../selects/types'

export type StringExtractor<T> = FnExt<T, string>

type SearchableMultiSelectSettings<T> = Omit<SelectProps<T>, 'model'> & {
  model: StateModel<T[]>
  style?: SearchableListStyles & SelectStyles
  searchModel?: SearchableListModel<T>
}

export type SearchableMultiSelectProps<T> = SearchableMultiSelectSettings<T> & {
  model: StateModel<T[]>
  searchModel: SearchableListModel<T>
}

export type MultiSelectProps<T> = Omit<
  SearchableMultiSelectProps<T>,
  'searchModel'
> & {
  searchModel?: SearchableListModel<T>
  selectAllLabel?: string
  removeAllLabel?: string
  showSelectAllButtons?: boolean
}

type TabLabelFnProps<T> = {
  items: T[]
}

export type DropdownMultiSelectProps<T> = MultiSelectProps<T> &
  Omit<DropdownSelectProps<T>, 'placeholder'> & {
    tabLabel?: (props: TabLabelFnProps<T>) => string
    listHeight?: number | string
  }

export type DropdownSelectProps<T> = Omit<
  SearchableMultiSelectSettings<T>,
  'style'
> & {
  placeholder?: string
  label?: string | ReactNode
  style?: DropdownSelectStyles & {
    searchInput?: InputStyles
  }
  onOpenDropdown?: Fn
  preset?: DropdownSelectPreset
  searchModel?: SearchableListModel<T>
  model: StateModel<T[]>
}
