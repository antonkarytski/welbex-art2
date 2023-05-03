import { PaginatedListResponse } from '../../types'

export type FaqItem = {
  id: number
  question: string
  answer: string
}
export type FaqResponse = PaginatedListResponse<FaqItem>
export type FaqParams = {
  language: 'EN' | 'RU'
  page?: number
  size?: number
}
