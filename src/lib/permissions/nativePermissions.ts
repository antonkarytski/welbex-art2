import { attach, createEffect } from 'effector'
import { RESULTS, check, request } from 'react-native-permissions'
import { Permission } from 'react-native-permissions/src/types'
import { TXT } from '../../translations/Texts'
import { languageModel } from '../../translations/model.languages'
import { LangStructure } from '../../translations/types'
import { createPermissionModel } from './model'

type RequestLangStructure = {
  title: string
  message: string
  buttonPositive?: string
  buttonNegative?: string
  buttonNeutral?: string
}

type RationaleLangFn = (lang: LangStructure) => RequestLangStructure

const createLocalizedPermissionRequest = (
  name: Permission,
  langStructure: RationaleLangFn
) => {
  return attach({
    source: languageModel.$state,
    mapParams: (_: void, language) => ({ text: TXT[language] }),
    effect: createEffect(({ text }: { text: LangStructure }) => {
      return request(name, {
        rationale: langStructure(text),
      })
    }),
  })
}

export const createNativePermissionModel = (
  name: Permission,
  langStructure: RationaleLangFn
) => {
  return createPermissionModel({
    check: () => check(name),
    request: createLocalizedPermissionRequest(name, langStructure),
    initialStatus: RESULTS.DENIED,
    grantedStatus: RESULTS.GRANTED,
  })
}
