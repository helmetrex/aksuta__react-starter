/* eslint-disable arrow-body-style */
/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

import React from 'react';

import Home from './Home';

const title = 'Ask2do';
const key = 'home';

// const loadData = ({ api, store }) => async isClient => {
//   await testUserProfile(store.dispatch, store.getState, api);
//   let processId;
//   if (isClient) {
//     processId = addRuntimeProcess(store.dispatch);
//   }
//   const projectListData = await api('GET_CACHE', '/public/projects');
//   store.dispatch(setProjectList(projectListData));
//   if (processId) {
//     store.dispatch(removeRuntimeProcess(processId));
//   }
// };

function action() {
  return {
    chunks: [key],
    title,
    // loadData: loadData(context),
    component: <Home key={key} />,
  };
}

export default action;
