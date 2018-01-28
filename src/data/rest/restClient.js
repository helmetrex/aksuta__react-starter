/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

/* eslint-disable no-return-assign */

import request from 'request';

/**
 *
 * @param url
 * @param requestBody
 * @param errorParser
 * @param authToken
 * @returns {Promise}
 */
export function post(url, requestBody, errorParser, authToken = null) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      uri: url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'User-Agent': 'request',
      },
      method: 'POST',
      json: true,
      body: requestBody,
      followAllRedirects: false,
    };
    if (authToken) {
      requestOptions.headers['X-Auth-Token'] = authToken;
    }
    try {
      request(requestOptions, (error, response, body) => {
        if (response) {
          if (response.statusCode !== 200) {
            reject(errorParser({ error, response, body, url }));
          } else {
            resolve(body);
          }
        } else {
          reject(errorParser({ url }));
        }
      });
    } catch (e) {
      reject(errorParser({ body: e.message }));
    }
  });
}

/**
 *
 * @param url
 * @param requestBody
 * @param errorParser
 * @param authToken
 * @returns {Promise}
 */
export function put(url, requestBody, errorParser, authToken = null) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      uri: url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'User-Agent': 'request',
      },
      method: 'PUT',
      json: true,
      body: requestBody,
      followAllRedirects: false,
    };
    if (authToken) {
      requestOptions.headers['X-Auth-Token'] = authToken;
    }
    try {
      request(requestOptions, (error, response, body) => {
        if (response) {
          if (response.statusCode !== 200) {
            reject(errorParser({ error, response, body, url }));
          } else {
            resolve(body);
          }
        } else {
          reject(errorParser({ url }));
        }
      });
    } catch (e) {
      reject(errorParser({ body: e.message }));
    }
  });
}

export function del(url, requestBody, errorParser, authToken = null) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      uri: url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'User-Agent': 'request',
      },
      method: 'DELETE',
      json: true,
      body: requestBody,
      followAllRedirects: false,
    };
    if (authToken) {
      requestOptions.headers['X-Auth-Token'] = authToken;
    }
    try {
      request(requestOptions, (error, response, body) => {
        if (response) {
          if (response.statusCode !== 200) {
            reject(errorParser({ error, response, body, url }));
          } else {
            resolve(body);
          }
        } else {
          reject(errorParser({ url }));
        }
      });
    } catch (e) {
      reject(errorParser({ body: e.message }));
    }
  });
}

/**
 *
 * @param url
 * @param errorParser
 * @param authToken
 * @returns {Promise}
 */
export function get(url, errorParser, authToken = null) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'request',
      },
      uri: url,
      method: 'GET',
      json: true,
      followAllRedirects: false,
    };
    if (authToken) {
      requestOptions.headers['X-Auth-Token'] = authToken;
    }
    try {
      request(requestOptions, (error, response, body) => {
        if (response) {
          if (response.statusCode !== 200) {
            reject(errorParser({ error, response, body, url }));
          } else {
            resolve(body);
          }
        } else {
          reject(errorParser({ url }));
        }
      });
    } catch (e) {
      reject(errorParser({ body: e.message }));
    }
  });
}

/**
 *
 * @param url
 * @param authToken
 * @returns {Promise}
 */
export function getText(url, errorParser, authToken = null) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      headers: {
        'User-Agent': 'request',
      },
      uri: url,
      method: 'GET',
      json: false,
    };
    if (authToken) {
      requestOptions.headers['X-Auth-Token'] = authToken;
    }
    try {
      request(requestOptions, (error, response, body) => {
        if (response) {
          if (response.statusCode !== 200) {
            reject(errorParser({ error, response, body, url }));
          } else {
            resolve(body);
          }
        } else {
          reject(errorParser({ url }));
        }
      });
    } catch (e) {
      reject(errorParser({ body: e.message }));
    }
  });
}
