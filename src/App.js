import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import interact from 'interactjs';
import CodeFlask from 'codeflask';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">JS GUI Tool</h1>
        </header>
        <p className="App-intro">
        <div id="code-area"></div>
          To get started, write some code in the box below. Refer to the docs to create simple UI elements.
        </p>
      </div>
    );
  }
}

export default App;
