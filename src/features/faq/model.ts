import { attach, createEffect, createEvent, restore } from 'effector'
import { api } from '../../api'
import { FaqItem } from '../../api/parts/faq/types'
import { languageModel } from '../../translations/model.languages'
import { Languages } from '../../translations/types'

type FaqListModel = {
  language: Languages
  list: FaqItem[]
}
export const setFaqList = createEvent<FaqListModel | null>()
export const $faqList = restore(setFaqList, null)

type LoadFxProps = {
  current: FaqListModel | null
  language: Languages
}
export const loadFaq = attach({
  source: { current: $faqList, language: languageModel.$state },
  mapParams: (_: void, store) => store,
  effect: createEffect(
    async ({ current, language }: LoadFxProps): Promise<FaqListModel> => {
      if (!current || language !== current.language) {
        const result = await api.faq.getAll({ language })
        return {
          list: result.items,
          language,
        }
      }
      throw new Error('Already loaded')
    }
  ),
})

loadFaq.done.watch(({ result }) => {
  setFaqList(result)
})
