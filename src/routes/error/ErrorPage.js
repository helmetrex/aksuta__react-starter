/*
 * Copyright (c) 2017. Helmetrex Ltd.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.css';

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    error: null,
  };

  render() {
    if (__DEV__ && this.props.error) {
      return (
        <div className={s.container}>
          <div>
            <h1>{this.props.error.name}</h1>
            <pre>{this.props.error.stack}</pre>
          </div>
        </div>
      );
    }

    return (
      <div className={s.container}>
        <div>
          <h1>Error</h1>
          <p>Sorry, a critical error occurred on this page.</p>
        </div>
      </div>
    );
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);
