type Fn = (...arg: any[]) => any;

type LengthOfArray<T extends any[]> = T extends { length: infer L } ? L : never;

type DropFirstInArray<T extends any[]> = ((...args: T) => any) extends (
  arg: any,
  ...rest: infer U
) => any
  ? U
  : T;

type LastInArray<T extends any[]> = T[LengthOfArray<DropFirstInArray<T>>];

export const compose =
  <F extends Fn[]>(...fns: F) =>
  (...args: Parameters<LastInArray<F>>) =>
    fns.reduceRight((acc, fn) => [fn(...acc)], args as any[])[0] as ReturnType<
      F[0]
    >;
