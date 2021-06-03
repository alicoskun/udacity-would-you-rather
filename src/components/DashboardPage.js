import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import QuestionComponent from './QuestionComponent';
import { handleQuestionData } from '../actions/questions';

class DashboardPage extends Component {
  componentDidMount() {
    if (!this.props.questions) {
      this.props.dispatch(handleQuestionData());
    }
  }
  
  render() {
    const { user, questions, loading } = this.props;
    const tabStyle = {
      border: '1px solid #dee2e6',
      padding: '10px'
    }

    if (loading || !questions) {
      return <span className="d-block h2 text-center">loading...</span>;
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
          {
            unansweredQuestionIds.length
              ? unansweredQuestionIds.map(q => <QuestionComponent key={q} id={q} />)
              : <span className="d-block text-center my-5">There is no unanswered question.</span>
          }
        </Tab>
        <Tab eventKey="answered" title="Answered Questions" style={tabStyle}>
          {
            answeredQuestionIds.length 
              ? answeredQuestionIds.map(q => <QuestionComponent key={q} id={q} />)
              : <span className="d-block text-center my-5">There is no answered question.</span>
          }
        </Tab>
      </Tabs>
    );
  }
}

function mapStateToProps({ authedUser, users, questions, loadingBar }) {
  return {
    user: users[authedUser],
    questions,
    loading: loadingBar.default,
  };
}

export default connect(mapStateToProps)(DashboardPage);
