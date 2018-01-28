/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */
/* eslint-disable */

export function getCookieItem(sKey) {
  return (
    document.cookie.replace(
      new RegExp(
        `(?:(?:^|.*;)\\s*${sKey.replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`,
      ),
      '$1',
    ) || null
  );
}

export function setCookieItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
    return false;
  }
  let sExpires = '';
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires =
          vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${vEnd}`;
        break;
      case String:
        sExpires = `; expires=${vEnd}`;
        break;
      case Date:
        sExpires = `; expires=${vEnd.toUTCString()}`;
        break;
      default:
        sExpires = '';
        break;
    }
  }
  document.cookie = `${sKey}=${sValue}${sExpires}${sDomain ? `; domain=${sDomain}` : ''}${sPath
    ? `; path=${sPath}`
    : ''}${bSecure ? '; secure' : ''}`;
  return true;
}

export function removeCookieItem(sKey, sPath, sDomain) {
  if (!sKey || !hasCookieItem(sKey)) {
    console.log('There is no such a cookie: ', sKey);
    return false;
  }
  document.cookie = `${sKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${sDomain
    ? `; domain=${sDomain}`
    : ''}${sPath ? `; path=${sPath}` : ''}`;
  return true;
}

export function hasCookieItem(sKey) {
  return new RegExp(`(?:^|;\\s*)${sKey.replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=`).test(
    document.cookie,
  );
}
