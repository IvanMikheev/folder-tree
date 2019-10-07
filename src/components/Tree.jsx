import React, { Component } from 'react'
import TreeNode from './TreeNode'
import { FaSearch } from "react-icons/fa";

//const URL = 'https://raw.githubusercontent.com/wrike/frontend-test/master/data.json';
const URL = 'https://next.json-generator.com/api/json/get/NkQZN2Z_D';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
      isLoading: false,
      error: null,
      isTreeDone: false,
      filter: '',
      nestedTree:
      {
        title: '',
        childs: []
      }
    };
    this.filterChange = this.filterChange.bind(this);
  }

  sortClick(order) {
    const root = this.state.nestedTree;
    sortChilds(root.childs, order);
    this.setState({ nestedTree: root });
  }

  filterChange(event) {
    this.setState({
      filter: event.target.value
    });

    const root = this.state.nestedTree;
    filterTree(root, event.target.value);
    this.setState({ nestedTree: root });
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(URL)
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

  componentDidUpdate() {
    if (!this.state.isTreeDone) {
      const nodes = this.state.nodes;
      // Find root and build tree
      if (nodes.filter(node => node.id === -1).length === 1) {
        let root = nodes.filter(node => node.id === -1)[0];
        root.childs = addChilds(root, nodes);
        this.setState({ nestedTree: root, isTreeDone: true });
      }
    }
  }

  render() {
    const { nestedTree, nodes, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (nodes.filter(node => node.id === -1).length !== 1) {
      return <p>Wrong Tree!</p>;
    }

    return (
      <div className="tree">
        <div className="header-tree">
          <div className="search-block">
            <FaSearch className="search-icon" />
            <input className="search-input" type="text" onChange={this.filterChange} />
          </div>
          <button className="sort-button" onClick={this.sortClick.bind(this, ascendingOrder)}>A-Z</button>
          <button className="sort-button" onClick={this.sortClick.bind(this, descendingOrder)}>Z-A</button>
        </div>
        {!nestedTree.show && <p>Nothing to show</p>}
        {nestedTree.show && <TreeNode key={nestedTree.id} node={nestedTree} level={0} />}
      </div>
    )
  }
}

const addChilds = (currentNode, allNodes) => {
  const childs = allNodes.filter(node => currentNode.id === node.parentId);
  childs.forEach(child => {
    child.childs = addChilds(child, allNodes);
  });
  currentNode.show = true;
  return childs;
}

const sortChilds = (childs, sortOrder) => {
  childs.sort(sortOrder);
  childs.forEach(child => {
    sortChilds(child.childs, sortOrder);
  });
}

const filterTree = (node, filter) => {
  const title = node.title.toLowerCase();
  filter = filter.toLowerCase();
  node.show = false;
  if (title.includes(filter)) {
    node.show = true;
  }
  node.childs.forEach(child => {
    if (node.show)
      filterTree(child, filter);
    else
      node.show = filterTree(child, filter);
  })
  return node.show;
}

const ascendingOrder = (a, b) => {
  return a.title > b.title ? 1 : -1;
}

const descendingOrder = (a, b) => {
  return b.title > a.title ? 1 : -1;
}

export default Tree
