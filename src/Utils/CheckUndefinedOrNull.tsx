// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CheckUndefinedOrNull = (d: any) => {
  if (d === undefined || d === null) return true;
  return false;
};
