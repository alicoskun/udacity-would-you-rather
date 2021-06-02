import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionsComponent from './QuestionsComponent';
import SignInComponent from './SignInComponent';

class DashboardPage extends Component {
  render() {
    return this.props.authedUser === '' ? <SignInComponent /> : <QuestionsComponent />;
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(DashboardPage);
