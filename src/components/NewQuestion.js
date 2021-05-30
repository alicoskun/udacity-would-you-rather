import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';
import SignIn from './SignIn';

class NewQuestion extends Component {
  render() {
    return <span>new question</span>
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(NewQuestion);
