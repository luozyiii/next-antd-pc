'use client';

import useSWR from 'swr';
import { message } from 'antd';
import { clearCookies } from '@/app/action';
import { NEST_API } from '@/config';
import { AUTH_FAILED, HTTP_CLIENT_ERROR, HTTP_SUCCESS } from '@/config/httpcode';

// 指定请求地址
const fetcherFn = (options: any) => (url: string) => fetch(NEST_API + url, options).then((res) => res.json());

type UseFetchProps = {
  url: string;
  method?: 'get' | 'post' | 'put' | 'head' | 'options' | 'delete';
  params?: any;
  options?: any; // fetch 请求的 options
  token?: string; // 请求令牌
};

type UseFetchReturnProps = {
  raw: any; // 请求返回的原始数据
  data: any; // 处理后的数据
  error: any; // 错误信息
  loading: boolean; // 是否在请求
  msg?: string; // 接口返回的错误信息
};

const useFetch = ({ url, method = 'get', params = {}, options = {}, token }: UseFetchProps): UseFetchReturnProps => {
  let _url = '';
  let _options = {};
  const { headers = {}, ...otherOptions } = options;
  const lowerMethod = method?.toLocaleLowerCase();

  if (['get', 'delete'].includes(lowerMethod)) {
    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      _url = url + '?' + queryString;
    } else {
      _url = url;
    }

    _options = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers,
      },
      ...otherOptions,
      method: method?.toLocaleUpperCase(),
    };
  } else {
    _url = url;
    _options = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(params),
      ...otherOptions,
      method: method?.toLocaleUpperCase(),
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

export const fetchData = async ({ url, method = 'get', params = {}, options = {} }: UseFetchProps) => {
  try {
    let _url = '';
    let _options = {};
    const { headers = {}, ...otherOptions } = options;
    const lowerMethod = method?.toLocaleLowerCase();

    if (['get', 'delete'].includes(lowerMethod)) {
      const queryString = new URLSearchParams(params).toString();
      if (queryString) {
        _url = url + '?' + queryString;
      } else {
        _url = url;
      }

      _options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...headers,
        },
        ...otherOptions,
        method: method?.toLocaleUpperCase(),
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
        method: method?.toLocaleUpperCase(),
      };
    }

    const response = await fetch(NEST_API + _url, _options);

    const jsonData = await response.json();
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
  } catch (error: any) {
    throw new Error(error);
  }
};

export default useFetch;
