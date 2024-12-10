import { VueClassProp, VueStyleProp } from "quasar";
import { PropType } from "vue";

type IsKeyRequired<T, Keys extends keyof T> =
  { [Key in Keys]?: T[Key] } extends Pick<T, Keys> ? false : true;

/**
 * @example
 * ```ts
 * props: {
 *   ...(QBtn['props'] as PropOptions<QBtnProps>),
 * }
 * ```
 */
export type PropOptions<T> = {
  [K in keyof Required<T>]: {
    type: PropType<T[K]>;
    required: IsKeyRequired<T, K>;
  };
};

type ExtractSetupProps<T> = T extends {
  setup?(props: infer P, ...rest: unknown[]): unknown;
}
  ? P extends unknown
    ? P
    : never
  : never;

type ExtractConstructedProps<T> = T extends new (...args: unknown[]) => {
  $props: infer X;
}
  ? X extends Record<string, unknown>
    ? X
    : never
  : never;

export type PublicPropsOf<T> = Pick<
  ExtractConstructedProps<T>,
  keyof ExtractSetupProps<T>
>;

export type ComponentProps<T> = T extends new (...angs: any) => {
  $props: infer P;
}
  ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any
    ? P
    : {};

export type ComponentSlots<T> = T extends new (...angs: any) => {
  $slots: infer S;
}
  ? NonNullable<S>
  : T extends (
        props: any,
        ctx: { slots: infer S; attrs: any; emit: any },
        ...args: any
      ) => any
    ? NonNullable<S>
    : {};

export type ComponentEmit<T> = T extends new (...angs: any) => {
  $emit: infer E;
}
  ? NonNullable<E>
  : T extends (
        props: any,
        ctx: { slots: any; attrs: any; emit: infer E },
        ...args: any
      ) => any
    ? NonNullable<E>
    : {};

export type ComponentExposed<T> = T extends new (...angs: any) => infer E
  ? E
  : T extends (
        props: any,
        ctx: any,
        expose: (exposed: infer E) => any,
        ...args: any
      ) => any
    ? NonNullable<E>
    : {};

export type WithOverrides<T, Overrides> = Omit<T, keyof Overrides> & Overrides;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type UnionKeys<T> = T extends any ? keyof T : never;

type StrictUnionHelper<T, TAll> = T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>>
  : never;

type StrictUnion<T> = StrictUnionHelper<T, T>;

export type UniqueKeys<T, K = keyof T> =
  IsUnion<K> extends true ? StrictUnion<T> : T;

export type FilterFunctions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};

export type WithStyles<TProps> = TProps & {
  class?: VueClassProp;
  style?: VueStyleProp;
};
