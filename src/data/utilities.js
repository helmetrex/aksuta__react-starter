/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

export const truncate = (text, num) => {
  if (text && text.length > num) {
    return `${text.substr(0, num)}...`;
  }
  return text;
};
