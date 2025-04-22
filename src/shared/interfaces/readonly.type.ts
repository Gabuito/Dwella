type NeverOnSet<T> = T extends `set${infer U}` ? U extends Capitalize<U> ? never : T : T;

export type betterReadonly<T,Deep extends boolean = false> = {
  readonly [K in keyof T as T[K] extends Function? NeverOnSet<K>: K]: Deep extends true ?
   T[K] extends object ? betterReadonly<T[K]> : T[K] : T[K]
};