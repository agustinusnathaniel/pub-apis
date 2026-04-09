import ky from 'ky';

// biome-ignore lint/suspicious/noExplicitAny: -
export const fetcher = <ResType>(url: string, params?: any) =>
  ky.get(url, { searchParams: params }).json<ResType>();
