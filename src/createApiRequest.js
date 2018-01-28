/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

import { getCookieItem } from './cookieUtils';

export function createServerApiRequest(controller, cookies) {
  return async function apiRequest(type, method, body) {
    let token = null;
    if (cookies) {
      token = cookies.token;
    }
    try {
      return await controller(token, type, method, body);
    } catch (err) {
      console.error('API error: ', err);
      throw err;
    }
  };
}

export function createClientApiRequest(fetch) {
  return async function apiRequest(type, method, body) {
    const token = getCookieItem('token');
    const resp = await fetch('/api', {
      body: JSON.stringify({
        token,
        type,
        method,
        body,
      }),
    });
    const response = await resp.json();
    const { data, error } = response;
    if (error) {
      throw error;
    }
    return data;
  };
}
