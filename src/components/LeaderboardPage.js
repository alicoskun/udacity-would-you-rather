import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LeaderboardPage extends Component {

  render() {
    let { authedUser, users } = this.props;
    
    if (!authedUser) {
      return (
        <div className="d-block text-center">
          <span className="d-block h3 my-5">You need to sign in to display this page.</span>
          <Link to="/"><Button variant="success">Sign in</Button></Link>
        </div>
      );
    }

    users = users.sort(
      (userA, userB) => {
        const answeredQuestionCountB = Object.keys(userB.answers).length;
        const createdQuestionCountB = userB.questions.length;
        const totalB = answeredQuestionCountB + createdQuestionCountB;
        
        const answeredQuestionCountA = Object.keys(userA.answers).length;
        const createdQuestionCountA = userA.questions.length;
        const totalA = answeredQuestionCountA + createdQuestionCountA;
        
        return totalB - totalA;
      });

    return (
      users.map(user => {
        const answeredQuestionCount = Object.keys(user.answers).length;
        const createdQuestionCount = user.questions.length;

        return (
        <Card className="my-3" key={user.id}>
          <Card.Body className="p-3">
          <div className="d-flex align-items-center">
            <Card.Img className="card-img w-25 rounded-circle mr-3" variant="top" src={user.avatarURL} />            
            <div className="align-self-stretch border-left pl-3 mr-auto">
              <Card.Text className="h3 my-3">{user.name}</Card.Text>
              <Card.Text className="h6 font-weight-normal my-3">Answered questions: {answeredQuestionCount}</Card.Text>
              <Card.Text className="h6 font-weight-normal my-3">Created questions: {createdQuestionCount}</Card.Text>
            </div>         
            <div className="border-left ml-3 pl-3">
              <Card>
                <Card.Header className="text-bold">
                  Score
                </Card.Header>
                <Card.Body className="text-center p-4">
                  <div className="rounded-circle bg-success h4 m-0 px-3 py-2 text-white">{answeredQuestionCount + createdQuestionCount}</div>
                </Card.Body>
              </Card>
            </div>
          </div>
          </Card.Body>
        </Card>
      )
      })
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: Object.keys(users).map(userId => users[userId])
  };
}

export default connect(mapStateToProps)(LeaderboardPage);
