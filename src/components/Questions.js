import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Question from './Question';
import { handleQuestionData } from '../actions/questions';

class Questions extends Component {
  componentDidMount() {
    this.props.dispatch(handleQuestionData());
  }
  
  render() {
    const { user, questions, loading } = this.props;
    const tabStyle = {
      border: '1px solid #dee2e6',
      padding: '10px'
    }

    if (loading) {
      return <span className="d-block h1 text-center">loading...</span>;
    }
    
    const answeredQuestionIds = Object.keys(user.answers).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp);

    const allQuestionsIds = Object.keys(questions);

    let unansweredQuestionIds = allQuestionsIds.filter(id => !answeredQuestionIds.includes(id));    
    unansweredQuestionIds = unansweredQuestionIds.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp);

    return (
      <Tabs fill defaultActiveKey="unanswered">
        <Tab eventKey="unanswered" title="Unanswered Questions" style={tabStyle}>
          {unansweredQuestionIds.map(q => <Question key={q} id={q} />)}
        </Tab>
        <Tab eventKey="answered" title="Answered Questions" style={tabStyle}>
          {answeredQuestionIds.map(q => <Question key={q} id={q} />)}
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
