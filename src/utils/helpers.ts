export const randomString = (length: number) =>
  Math.random()
    .toString(36)
    .substring(2, 2 + length);

export const randomEmail = () => `${randomString(8)}@example.com`;
