/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

import UniversalRouter from 'universal-router';
import routes from './routes';

export default new UniversalRouter(routes, {
  resolveRoute(context, params) {
    /*
    context:
          baseUrl
          fetch
          insertCss
          keys
          next
          params
          pathname
          query
          route
          router
          store
          storeSubscription
     */
    if (typeof context.route.load === 'function') {
      return context.route.load().then(action => action.default(context, params));
    }
    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }
    return null;
  },
});
