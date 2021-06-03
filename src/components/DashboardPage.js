import React from 'react';
import { connect } from 'react-redux';
import QuestionsComponent from './QuestionsComponent';
import SignInComponent from './SignInComponent';

const DashboardPage = (props) => {
  return props.authedUser === '' ? <SignInComponent /> : <QuestionsComponent />;
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(DashboardPage);
