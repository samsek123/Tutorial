// @flow
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reduxData from './Reducers/';

import Router from './Router';

const store = createStore(
  reduxData,
  applyMiddleware(
    thunkMiddleware,
    createLogger(),
  ),
);

type Props = {

}

class App extends Component<Props> {
  static defaultProps = {

  };

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
