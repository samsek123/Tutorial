import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sampleAction } from '../../Reducers/Sample/action';

type Props = {

}

function mapDispatchToProps(dispatch) {
  return ({
    sampleAction: bindActionCreators(sampleAction, dispatch),
  });
}

function mapStateToProps(state) {
  return ({ sample: state.sample });
}

class Sample extends Component<Props> {
  constructor() {
    super();
    this.state = {
      sample: 0,
    };
    this.sampleAction = this.sampleAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (typeof (nextProps.sample) !== 'undefined') {
      this.setState({
        sample: nextProps.sample,
      });
    }
  }

  sampleAction() {
    this.props.sampleAction();
  }

  render() {
    return (
      <div>
        <button onClick={this.sampleAction}>{this.state.sample}</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sample);
