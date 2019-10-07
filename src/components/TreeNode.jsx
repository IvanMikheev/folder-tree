import React, { Component } from 'react'
import { FaCaretRight } from 'react-icons/fa';

class TreeNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      level: null,
      childs: [],
      show: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  static getDerivedStateFromProps(props, state) {
    if (props.node.title !== state.title) {
      return {
        show: props.node.show,
        isOpen: true,
        title: props.node.title,
        level: props.level,
        childs: props.node.childs
      };
    }

    return null;
  }

  render() {
    const hasChild = this.state.childs.length > 0;
    
    if (hasChild) {
      return (
        <div style={{ paddingLeft: 20 }}>
          <p className="node-title" onClick={this.handleClick}>
            <FaCaretRight className={this.state.isOpen ? "node-icon node-icon-open" : "node-icon node-icon-closed"} />{this.state.title}
          </p>
          <div className={this.state.isOpen ? "node-childs" : "node-childs node-closed"}>
            {this.state.childs.filter(item => item.show).map(child =>
              <TreeNode key={child.id} node={child} level={this.state.level + 1} />
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ paddingLeft: 20 }}>
          <p className="node-title">
            {this.state.title}
          </p>
        </div>
      )
    }
  }
}

export default TreeNode
