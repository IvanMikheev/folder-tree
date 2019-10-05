import React, { Component } from 'react'

class TreeNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      title: '',
      parentId: null,
      level: null,
      childs: []
    };
  }

  componentDidMount() {
    this.setState({ 
      id: this.props.node.id,
      title: this.props.node.title,
      parentId: this.props.node.parentId,
      level: this.props.level,
      childs: this.props.node.childs
     });
  }

  render() {
    return (
      <div style={{ paddingLeft: 20 }}>
        {this.state.title}
        {this.state.childs.map( child => 
          <TreeNode node={child} level={this.state.level + 1} />
        )}
      </div>
    )
  }
}



export default TreeNode
