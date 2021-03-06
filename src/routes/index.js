/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',
  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action(context) {
    // Execute each child route until one of them return the result
    const route = await context.next(true);

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - ask2do.com`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
