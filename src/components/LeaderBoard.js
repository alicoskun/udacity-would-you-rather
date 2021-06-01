import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
  render() {
    return <span>leader board</span>
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(LeaderBoard);
