import React, { Component } from 'react'
import { FaCaretRight } from 'react-icons/fa';

class TreeNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      level: null,
      childs: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  componentDidMount() {
    this.setState({
      isOpen: true,
      title: this.props.node.title,
      level: this.props.level,
      childs: this.props.node.childs
    });
  }

  render() {
    
    const hasChild = this.state.childs.length > 0;

    if (hasChild) {
      return (
        <div style={{ paddingLeft: 20 }}>
          <p className="title" onClick={this.handleClick}>
            <FaCaretRight className={this.state.isOpen ? "icon icon-open" : "icon icon-closed"} />{this.state.title}
          </p>
          <div className={this.state.isOpen ? "childs" : "childs closed"}>
            {this.state.childs.map(child =>
              <TreeNode node={child} level={this.state.level + 1} />
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ paddingLeft: 20 }}>
          <p className="title">
            {this.state.title}
          </p>          
        </div>
      )
    }
  }
}

export default TreeNode
