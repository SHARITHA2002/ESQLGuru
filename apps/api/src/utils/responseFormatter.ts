export function responseFormatter<T>(payload: T) {
  return { data: payload };
}
