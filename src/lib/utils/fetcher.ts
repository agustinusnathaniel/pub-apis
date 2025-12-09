/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from 'axios';
import axios from 'axios';

// biome-ignore lint/suspicious/noExplicitAny: -
export const fetcher = <ResType>(url: string, params?: any) =>
  axios.get(url, { params }).then((res: AxiosResponse<ResType>) => res.data);
