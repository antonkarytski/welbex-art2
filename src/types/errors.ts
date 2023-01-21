type Writable = string | number | bigint | boolean | null | undefined
type IfWritable<N> = N extends Writable ? N : 'unknown'
export type ShouldBeAssignableTo<
  N extends string | number | symbol,
  NT,
  T
> = `type of field '${IfWritable<N>}' (${IfWritable<NT>}) is not assignable to type '${IfWritable<T>}'`
