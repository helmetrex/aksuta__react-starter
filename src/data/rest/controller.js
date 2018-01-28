/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

/* eslint-disable no-plusplus */

import { ask2doUrl, ask2doErrorParser } from './restClientFactory';
import { get, post, put, del } from './restClient';

const cache = {};

const controller = (token, type, method, body) => {
  const typeParts = type.split('_');
  let task;
  switch (typeParts[0]) {
    case 'PUT':
      task = put(ask2doUrl(method), body, ask2doErrorParser, token);
      break;
    case 'POST':
      task = post(ask2doUrl(method), body, ask2doErrorParser, token);
      break;
    case 'DELETE':
      task = del(ask2doUrl(method), body, ask2doErrorParser, token);
      break;
    case 'GET':
    default:
      if (typeParts[1] === 'CACHE') {
        const cachedItem = cache[method];
        // test if the cached item is in cache not more than 0.5 minute
        if (cachedItem && Date.now() - cachedItem.lastFetchTime < 1000 * 30) {
          task = Promise.resolve(cachedItem.fetchData);
        } else {
          task = get(ask2doUrl(method), ask2doErrorParser, token).then(response => {
            cache[method] = {
              lastFetchTime: Date.now(),
              fetchData: response,
            };
            return response;
          });
        }
      } else {
        task = get(ask2doUrl(method), ask2doErrorParser, token).then(response => {
          cache[method] = {
            lastFetchTime: Date.now(),
            fetchData: response,
          };
          return response;
        });
      }
      break;
  }
  return task;
};

export default controller;
