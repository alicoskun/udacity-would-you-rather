import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Question extends Component {
  render() {    
    const { question } = this.props;

    if (question === null) {
      return <p>This poll doesn't exist</p>;
    }

    const { pollId, avatarURL, author, answerText } = question;

    return (
      <Card>
        <Card.Header>
          <Card.Subtitle className="my-1">
            {author} asks
          </Card.Subtitle>
        </Card.Header>
        <Card.Body className="p-3">
        <div className="d-flex align-items-center">
          <Card.Img className="card-img w-25" variant="top" src={avatarURL} />
          <div className="border-left ml-3 pl-3 w-100">
            <Card.Text className="text-bold h5">Would you rather</Card.Text>
            <Card.Text className="text-muted">...{answerText}...</Card.Text>
            <NavLink className="w-100 btn btn-sm btn-outline-success" to="/">View Poll</NavLink>
          </div>
        </div>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const user = users[authedUser];
  const answer = question[user.answers[id]];

  return {
    question: question
      ? {
        pollId: id,
        avatarURL: user.avatarURL,
        author: questions.author,
        answerText: question[answer]
      }
      : null,
    authedUser
  };
}

export default connect(mapStateToProps)(Question);
