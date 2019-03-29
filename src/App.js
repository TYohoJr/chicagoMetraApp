import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./reducers";
import HomePage from './HomePage/HomePage';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <div className="App">
          <HomePage />
        </div>
      </Provider>
    );
  }
}

export default App;
