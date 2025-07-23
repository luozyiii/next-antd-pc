'use client';

import useSWR from 'swr';
import { message } from 'antd';
import { clearCookies } from '@/app/action';
import { NEST_API } from '@/config';
import { AUTH_FAILED, HTTP_CLIENT_ERROR, HTTP_SUCCESS } from '@/config/httpcode';
import type { ApiResponse, FetchOptions, UseFetchParams, UseFetchResult } from '@/types';

// 指定请求地址
const fetcherFn = (options: FetchOptions) => (url: string) => fetch(NEST_API + url, options).then((res) => res.json());

// 保持向后兼容的类型别名
type UseFetchProps = UseFetchParams;
type UseFetchReturnProps<T = unknown> = UseFetchResult<T>;

const useFetch = <T = unknown>({
  url,
  method = 'get',
  params = {},
  options = {},
  token,
}: UseFetchProps): UseFetchReturnProps<T> => {
  let _url = '';
  let _options: FetchOptions = {};
  const { headers = {}, ...otherOptions } = options;
  const lowerMethod = method?.toLowerCase();

  if (['get', 'delete'].includes(lowerMethod)) {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        },
        {} as Record<string, string>,
      ),
    ).toString();

    _url = queryString ? `${url}?${queryString}` : url;

    _options = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers,
      },
      ...otherOptions,
      method: method?.toUpperCase() as FetchOptions['method'],
    };
  } else {
    _url = url;
    _options = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(params),
      ...otherOptions,
      method: method?.toUpperCase() as FetchOptions['method'],
    };
  }

  const _fetcher = fetcherFn(_options);
  const { data: raw = {}, error, isLoading } = useSWR(_url, _fetcher);
  const { data, code, msg } = raw;

  if (code === HTTP_CLIENT_ERROR) {
    message.error(msg);
  }

  // token 过期
  if (code === AUTH_FAILED) {
    message.error(msg);
    clearCookies();
  }

  // 请求成功
  if (code === HTTP_SUCCESS) {
    return {
      raw: raw,
      data: data,
      msg,
      error: error,
      loading: isLoading,
    };
  }

  // 请求失败
  return {
    raw: raw,
    data: null,
    msg,
    error: error,
    loading: isLoading,
  };
};

export const fetchData = async <T = unknown>({
  url,
  method = 'get',
  params = {},
  options = {},
}: UseFetchParams): Promise<{
  raw: ApiResponse<T>;
  data: T | null;
  msg: string;
}> => {
  try {
    let _url = '';
    let _options: FetchOptions = {};
    const { headers = {}, ...otherOptions } = options;
    const lowerMethod = method?.toLowerCase();

    if (['get', 'delete'].includes(lowerMethod)) {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString();

      _url = queryString ? `${url}?${queryString}` : url;

      _options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...headers,
        },
        ...otherOptions,
        method: method?.toUpperCase() as FetchOptions['method'],
      };
    } else {
      _url = url;
      _options = {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(params),
        ...otherOptions,
        method: method?.toUpperCase() as FetchOptions['method'],
      };
    }

    const response = await fetch(NEST_API + _url, _options);

    const jsonData: ApiResponse<T> = await response.json();
    const { code, data, msg } = jsonData;

    if (code === HTTP_CLIENT_ERROR) {
      message.error(msg);
    }

    // 请求成功
    if (code === HTTP_SUCCESS) {
      return {
        raw: jsonData,
        data: data,
        msg,
      };
    }

    // 请求失败
    return {
      raw: jsonData,
      data: null,
      msg,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
};

export default useFetch;
