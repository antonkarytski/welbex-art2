export function byteToMB(bytes: number) {
  if (!bytes) return 0
  return bytes / 1000000
}
