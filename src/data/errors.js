/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

const regExp = /\[([^\]]+)\]/;

export const parseErrorText = text => {
  const errorObj = {};
  if (text) {
    if (isString(text)) {
      const matches = regExp.exec(text);
      if (matches && matches[1]) {
        const code = matches[1];
        const errorMessage = text.replace(regExp, '');
        if (code && errorMessage) {
          errorObj.code = code.trim();
          errorObj.message = errorMessage.trim();
        }
      } else {
        errorObj.message = text;
      }
    } else if (isObject(text)) {
      const { message } = text;
      errorObj.message = message;
    } else {
      errorObj.message = JSON.stringify(text);
    }
  }
  return errorObj;
};

export const errorCodes = {
  AUTH: 'auth',
  PRIMARY_EMAIL: 'primaryEmail',
  SYSTEM: 'system',
  USER_NAME: 'userName',
  USER_PASSWORD: 'userPassword',
  UNEQUAL_PASSWORDS: 'unequalPasswords',
};

const errors = {
  C1: { code: errorCodes.PRIMARY_EMAIL, message: 'Specified value is not a valid email address' },
  C2: { code: errorCodes.PRIMARY_EMAIL, message: 'Email address should be not empty' },
  C3: {
    code: errorCodes.PRIMARY_EMAIL,
    message: 'Email address should be not more than 300 characters',
  },
  C4: { code: errorCodes.USER_NAME, message: 'User name should be not empty' },
  C5: { code: errorCodes.USER_NAME, message: 'User name should be not more than 100 characters' },
  C6: { code: errorCodes.USER_NAME, message: 'Use only alphabet characters' },
  C7: { code: errorCodes.USER_PASSWORD, message: 'Password must be at least 6 characters' },
  C8: { code: errorCodes.USER_PASSWORD, message: 'Password must be not more than 300 characters' },
  C9: {
    code: errorCodes.UNEQUAL_PASSWORDS,
    message: 'Password value and retyped password value must be equal',
  },
  C10: { code: errorCodes.SYSTEM, message: 'The requested project was not found' },
  C11: {
    code: errorCodes.SYSTEM,
    message: 'A project name or an owner name was not specified',
  },
  C12: {
    code: errorCodes.SYSTEM,
    message: 'A project description should be not empty',
  },
  C13: {
    code: errorCodes.SYSTEM,
    message: 'A project name, an owner name or issue id was not specified',
  },
  C14: {
    code: errorCodes.SYSTEM,
    message: 'An issue description should be not empty',
  },
  C15: {
    code: errorCodes.SYSTEM,
    message: 'The project name should be not empty',
  },
  C16: {
    code: errorCodes.SYSTEM,
    message:
      'It seems that popup window from the current domain is restricted. Allow popup for the current domain.',
  },
};

export default errors;
