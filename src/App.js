import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import interact from 'interactjs';
import CodeFlask from 'codeflask';

const welcome = "testaroo"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome />
        </header>
        <p className="App-intro">
        <div id="code-area"></div>
          To get started, write some code in the box below. Refer to the docs to create simple UI elements.
        </p>
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    return (
      <h1 className="App-title">JS GUI Tool {welcome}</h1>
    )
  }
}

export default App;
