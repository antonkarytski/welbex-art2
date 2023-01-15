import { LangStructure } from '../../../translations/types'

const viewDrawingsImg = require('../../../../assets/images/greetings_view_drawings.png')
const uploadDrawingsImg = require('../../../../assets/images/greetings_upload_drawings.png')
const getRewardsImg = require('../../../../assets/images/greetings_get_rewards.png')

export function list({ text }: { text: LangStructure }) {
  return [
    {
      indexNumber: 0,
      img: viewDrawingsImg,
      description: text.viewAndLikeChildrenDrawings,
    },
    {
      indexNumber: 1,
      img: uploadDrawingsImg,
      description: text.uploadYourChildDrawings,
    },
    {
      indexNumber: 2,
      img: getRewardsImg,
      description: text.winAndGetRewards,
    },
  ]
}
