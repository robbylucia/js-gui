import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './editor.css';
import interact from 'interactjs';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';


const code = `let title = gui.label('To-do list');
gui.add(title)

// panel( columnAmount, array_of_SUI_Elements )
//let item = gui.panel( 2, [gui.checkbox(), //gui.editableText()] );

// addButton(buttonText, eventToEmit)
//let addButton = gui.button('Add item', 'addItemEvent')

//gui.add(item)
//gui.add(addButton)

//addEventListener('addItemEvent', function() {
  // gui.add(item)
//})

`;


const changeBackground = () => {
  console.log('CHANGING OT')
}


class App extends Component {

  constructor(props) {
    super(props);
    console.log('constructor')
    // this.test = this.test.bind(this)
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

  state = { code,
    display: (<h1> display </h1>),
    els: []
  };

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  setter = () => {
    this.setState({
      display: (<h2> hi </h2>)
    })
  }

  test = () => {
    this.setState({
      display: ("TESTAROO")
    })
  }


  execute = () => {
    
    // console.log(Editor)
    console.log(this.state.code)
    
    let builder = []

    const gui = {
      label: function(text) {
        return (<h3>{text}</h3>);
      },
      checkbox: function() {
        // return (<Checkbox checked={this.state.}></Checkbox>)
      },
      // els should become
      // <
      panel: function(cols, els) {
        return(
        <div className="gui-panel">
          <div className="col">{gui.label('test')}</div>
          <div className="col">{gui.label('Wowza')}</div>
        </div>)
      },
      add: function(item) {
        builder.push(item)
      },
      test: function(text) {
        // alert('hi')
        builder.push({type:"testLabel", text:text})
        // console.log(builder)
      }
    }

    eval(this.state.code)
    this.setState({els:builder})
    // this.test()
    // this.setState({display: (builder)})
  }

  

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text=" Alpha" toggle={this.state.toggle}/>
        </header>
        <Editor
          value={this.state.code}
          onValueChange={code => this.setState({ code })}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            background: "#272122",
            color: "#e3d6cb",
            width: "50%",
            left: "25%"
        }}
      />
      {this.state.display}
      <Elements els={this.state.els}/>
        
        <button onClick={this.execute}> Run code </button>
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    const { text, toggle } = this.props;
    // console.log(toggle)
    return (
      <h1 className="App-title">JS GUI Tool {text}</h1>
    )
  }
}

class Elements extends Component {
  render() {
    const { els } = this.props;
    // console.log(els)
    const thing = els.map((el) =>
      <div>{el}</div>
    );
    // console.log(thing)
    return (
      <h1>{thing}</h1>
    )
  }
}

class Checkbox extends Component {
  render() {
    const { els } = this.props;
    // console.log(els)
    const thing = els.map((el) =>
      <div>{el}</div>
    );
    // console.log(thing)
    return (
      <h1>{thing}</h1>
    )
  }
}

export default App;
