/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

/* eslint-disable import/prefer-default-export */


import isObject from 'lodash/isObject';
import config from '../../config';
import { parseErrorText } from '../errors';

const ERROR_TEXT_CONNECTION = '[system] Connection can not be established.';
const ERROR_TEXT_413 = '[system] The files content is too large.';
const ERROR_TEXT_404 = '[system] Requested resource was not found.';
const ERROR_TEXT_403 = '[auth] User account is not signed in.';
const ERROR_TEXT_401 = '[auth] User account is not authenticated.';
const ERROR_TEXT_502 = '[system] Connection to the server can not be established.';

/**
 *
 * @param text
 * @param statusCode
 * @param url
 * @returns {*}
 */
function parseAsk2doError(text, statusCode, url) {
  const errorTextObj = parseErrorText(text);
  const errorCompatibleObj = {
    name: errorTextObj.code || 'REST',
    stack: errorTextObj.message,
  };
  return { status: statusCode, url, ...errorTextObj, ...errorCompatibleObj };
}

/**
 *
 * @param path
 * @returns {string}
 */
export function ask2doUrl(path) {
  return `${config.ask2do.baseUrl}${path}`;
}

/**
 *
 */
export const ask2doErrorParser = options => {
  if (options) {
    const { error, response, body, url } = options;
    if (error) {
      return parseAsk2doError(ERROR_TEXT_CONNECTION, null, url);
    } else if (response) {
      const { statusCode } = response;
      if (statusCode === 413) {
        return parseAsk2doError(ERROR_TEXT_413, statusCode, url);
      } else if (statusCode === 404) {
        return parseAsk2doError(ERROR_TEXT_404, statusCode, url);
      } else if (statusCode === 403) {
        return parseAsk2doError(ERROR_TEXT_403, statusCode, url);
      } else if (statusCode === 401) {
        return parseAsk2doError(ERROR_TEXT_401, statusCode, url);
      } else if (statusCode === 502) {
        return parseAsk2doError(ERROR_TEXT_502, statusCode, url);
      }
      if (isObject(body)) {
        const { message } = body;
        return parseAsk2doError(message, null, url);
      }
      return parseAsk2doError(body, null, url);
    }
    return parseAsk2doError(ERROR_TEXT_CONNECTION, null, url);
  }
  return parseAsk2doError(ERROR_TEXT_CONNECTION, null, null);
};
