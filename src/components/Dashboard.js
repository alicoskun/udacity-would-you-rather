import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';
import SignIn from './SignIn';

class Dashboard extends Component {
  render() {
    return this.props.authedUser === '' ? <SignIn /> : <Questions />;
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(Dashboard);
