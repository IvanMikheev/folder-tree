import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 style={ Title }>Дерево папок</h1>
      </div>
    );
  }
}

const Title = {
  padding: "10px 20px",
  textAlign: "center"  
}

export default Header;