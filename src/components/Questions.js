import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Card } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import questions from '../reducers/questions';
import Question from './Question';
import { handleQuestionData } from '../actions/questions';

class Questions extends Component {
  componentDidMount() {
    this.props.dispatch(handleQuestionData());
  }
  
  render() {
    const tabStyle = {
      border: '1px solid #dee2e6',
      padding: '10px'
    }

    const user = this.props.user;
    console.log("🚀 ~ file: Questions.js ~ line 16 ~ Questions ~ render ~ user", user)
    // const answeredQuestions = user.questions.filter(q => q.optionOne.votes.some(user.id) || q.optionTwo.votes.some(user.id));
    // const unansweredQuestions = user.questions.filter(q => !q.optionOne.votes.some(user.id) && !q.optionTwo.votes.some(user.id));

    console.log("🚀 ~ file: Questions.js ~ line 28 ~ Questions ~ constructor ~ this.props.loading", this.props.loading)
    return this.props.loading === true ? <span>loading...</span> : (
      <Tabs fill defaultActiveKey="unanswered">
        <Tab eventKey="unanswered" title="Unanswered Questions" style={tabStyle}>
          {user.questions.map(q => <Question key={q} id={q} />)}
        </Tab>
        <Tab eventKey="answered" title="Answered Questions" style={tabStyle}>
          w
        </Tab>
      </Tabs>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    user: users[authedUser],
    questions,
    loading: questions === null,
  };
}

export default connect(mapStateToProps)(Questions);
