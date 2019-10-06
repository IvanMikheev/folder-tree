import React, { Component } from 'react'
import Header from './Header'
import Tree from './Tree'

class App extends Component {
  render() {
    return (
      <React.Fragment>      
        <Header />
        <Tree />
      </React.Fragment>
    );
  }
}

export default App;
