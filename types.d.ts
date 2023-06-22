type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>

declare global {
  type Range<T extends number, K extends number> = Exclude<Enumerate<K>, Enumerate<T>>
}
export {}
