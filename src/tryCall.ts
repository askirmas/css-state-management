type DataOrFunction<R, I extends any[] = []> = R extends Function ? never : (R | ((...args: I) => R))

export type {DataOrFunction}
export default tryCall

function tryCall<R, I extends any[] = never[]>(source: (...args: I) => R, args?: I) :R
function tryCall<R>(source: R, args?: any) :R
function tryCall<R, I extends any[]>(source: DataOrFunction<R, I>, args = [] as unknown as I) :R {
  return typeof source === "function"
  ? source(...args)
  : source
}
