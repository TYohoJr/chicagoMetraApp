import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.apiTest = this.apiTest.bind(this);
  }

  apiTest() {
    axios.get('/apiTest').then((result) => {
      console.log(result)
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.apiTest}>API Test</button>
      </div>
    );
  }
}

export default App;
