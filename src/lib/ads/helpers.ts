type CreateFreqFilterProps = {
  skipFirst?: boolean
}

export function createFreqFilter(
  frequency: number,
  { skipFirst }: CreateFreqFilterProps = {}
) {
  if (skipFirst) {
    return (index: number) => index !== 0 && index % frequency === 0
  }
  return (index: number) => index % frequency === 0
}
