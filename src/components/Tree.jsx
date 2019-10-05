import React, { Component } from 'react'
import TreeNode from './TreeNode'

const URL = 'https://raw.githubusercontent.com/wrike/frontend-test/master/data.json'; 

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
      isLoading: false,
      errors: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(URL)
      .then(response => response.json())
      .then(nodes => this.setState({ nodes, isLoading: false }))
      .catch(e => this.setState({ isLoading: false, error: e }));
  }

  render() {
    const { nodes, isLoading } = this.state;    

    if (isLoading) {      
      return <p>Loading ...</p>;      
    } 
    
    return (
      <div style = { Style }>        
        {nodes.map( (node,i) => 
          <TreeNode id={node.id} title={node.title} level={i}/>
        )}
      </div>
    )
  }
}

const Style = {
  width: "1000px",
  margin: "0 auto"
}

export default Tree
