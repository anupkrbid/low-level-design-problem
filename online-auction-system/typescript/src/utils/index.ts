export type Nullable<T> = T | null;

export async function runAsync<T>(
  fn: () => Promise<T>
): Promise<[Nullable<T>, Nullable<Error>]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (err) {
    return [null, err instanceof Error ? err : new Error(String(err))];
  }
}
