export class EmptyState {}

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * poweful typechecking of our reducers.
 *
 * Since every action lavel passes through this function it
 * is a good place to ensore all of our action labels
 * are unique.
 */

const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[label as string]) {
    throw new Error(`Action type ${label} is not unique`);
  }

  typeCache[label as string] = true;

  return label as T;
}
