/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

import { createLogger as reduxLogger } from 'redux-logger';

export default function createLogger() {
  return reduxLogger({
    collapsed: true,
  });
}
