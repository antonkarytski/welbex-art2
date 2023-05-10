import { ArtPreview } from '../../api/parts/arts/types'

export const drawingKeyExtractor = ({ id }: ArtPreview) => id.toString()
