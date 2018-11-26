import React, { Component } from 'react';

class Nav extends Component<Props> {
  constructor() {
    super();
    this.state = {
      hello: '100',
    };
  }

  componentWillReceiveProps() {

  }

  componentDidMount() {
    this.setState({
    });
  }

  render() {
    console.log(this.props.page);
    return (
      <div>
        {this.state.hello}
        {this.props.page[0].pagename}
      </div>
    )
  }
}

export default Nav;
