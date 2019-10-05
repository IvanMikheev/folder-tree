import React, { Component } from 'react'
import TreeNode from './TreeNode'

//const URL = 'https://raw.githubusercontent.com/wrike/frontend-test/master/data.json';
const URL2 = 'https://next.json-generator.com/api/json/get/NkQZN2Z_D';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
      isLoading: false,
      error: null,
      nestedTree: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(URL2)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Whoops... Error occurred');
        }
      })
      .then(nodes => this.setState({ nodes, isLoading: false }))
      .catch(e => this.setState({ isLoading: false, error: e }));
  }

  render() {
    const { nodes, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (nodes.filter(node => node.id === -1).length !== 1) {
      return <p>Wrong Tree!</p>;

    } else {
      let root = nodes.filter(node => node.id === -1)[0];
      root.childs = AddChilds(root, nodes);

      return (
        <div style={Style}>
          <TreeNode node={root} level={0} />
        </div>
      )
    }
  }
}

const Style = {
  width: "1000px",
  margin: "0 auto"
}

const AddChilds = (node, templateNodes) => {  
  const childs = templateNodes.filter(child => node.id === child.parentId);
  childs.forEach(item => {
    item.childs = AddChilds(item, templateNodes);
  });  
  return childs;
}

export default Tree
