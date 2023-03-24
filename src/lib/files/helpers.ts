export function getNameFromUrl(url: string) {
  const name = url.split('/').pop()
  return name || ''
}
