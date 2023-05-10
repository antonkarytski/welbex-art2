import { apiManager } from '../../apiManager'
import { FaqParams, FaqResponse } from './types'

const faqEndpoint = apiManager.endpoint('faq')

export const getAll = faqEndpoint.get<FaqResponse, FaqParams>('all')

export const faqApi = {
  getAll,
}
