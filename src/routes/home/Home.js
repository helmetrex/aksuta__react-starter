/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

/* eslint-disable react/forbid-prop-types */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <h1 className={s.heroText}>Ask2do Starter Development Kit</h1>
    );
  }
}

export default withStyles(s)(Home);
