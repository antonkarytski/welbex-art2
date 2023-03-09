import { ArtWorkPreviewResponse } from '../../api/parts/categories/types'

export const drawingKeyExtractor = ({ id }: ArtWorkPreviewResponse) =>
  id.toString()
