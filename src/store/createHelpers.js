/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

import { createClientApiRequest } from '../createApiRequest';

export default function createHelpers({ fetch, history }) {
  return {
    fetch,
    history,
    api: createClientApiRequest(fetch),
  };
}
