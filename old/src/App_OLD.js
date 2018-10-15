import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import interact from 'interactjs';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
 
const code = `function add(a, b) {
  return a + b;
}
`;
 



class App extends Component {

  constructor(props) {
    super(props);
    console.log('constructor')
    
  }

  // fired before component renders
  componentWillMount() {
    console.log('will mount')
  }

  // fired after component renders
  componentDidMount() {
    console.log('mounted')
  }

  componentWillUpdate() {

  }
  componentDidUpdate() {

  }

  state = {
    toggle: true
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text="this is a test" toggle={this.state.toggle}/>
        </header>
        <p className="App-intro">
        {/* <div id="code-area"></div> */}
          To get started, write some code in the box below. Refer to the docs to create simple UI elements.
        </p>

        {this.state.toggle &&
          <div className="editor" id="my-selector"> </div>
        }
        
        <button onClick={this.toggle}> Show / Hide </button>
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    const { text, toggle } = this.props;
    const flask = new CodeFlask('#my-selector', { language: 'js' });
    console.log(toggle)
    return (
      <h1 className="App-title">JS GUI Tool {text}</h1>
    )
  }
}

export default App;
