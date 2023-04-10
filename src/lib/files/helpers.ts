export function getNameFromUrl(url: string) {
  const path = url.split('?')[0]
  return path.substring(path.lastIndexOf('/') + 1)
}
