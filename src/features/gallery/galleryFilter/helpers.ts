import { getNumberPostfixWordDeclension } from '../../../lib/helpers/numbers'
import { LangStructure } from '../../../translations/types'

export function getArtWorksAmountTranslation(
  amount: number | undefined,
  text: LangStructure
) {
  if (typeof amount !== 'number') return ''

  const resultText = getNumberPostfixWordDeclension({
    number: amount,
    singularText: text.oneArtWorksInAccusative,
    pluralText: text.artWorksInAccusative,
    pluralLessThenFiveText: text.lessThenFiveArtWorksInAccusative,
    pluralEndsWithOneText: text.artWorksInAccusativeEndsWithOne,
  })
  return `${amount ?? ''} ${resultText}`
}
