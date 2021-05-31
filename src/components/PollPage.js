import React, { Component } from 'react';
import { Card, Button, Alert, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';

class PollPage extends Component {

  setOption = () => {
    console.log("set");
    // this.props.dispatch(setAuthedUser(this.state.selectedUser));
  }

  render() {
    const { id, question, authorName, authorAvatar, user } = this.props;
    const answer = user.answers[id];
    const optionOneCount = question.optionOne.votes.length;
    const optionTwoCount = question.optionTwo.votes.length;
    const totalAnswerCount = optionOneCount + optionTwoCount;

    return (
      answer
      ? (
        <div>
          <Card>
            <Card.Header>
              <Card.Subtitle className="my-1">
                {authorName} asks
              </Card.Subtitle>
            </Card.Header>
            <Card.Body className="p-3">
            <div className="d-flex align-items-center">
              <Card.Img className="card-img w-25" variant="top" src={authorAvatar} />
              <div className="border-left ml-3 pl-3 w-100">
                <Card.Text className="text-bold h5">Results:</Card.Text>
                <Alert key="optionOne" variant={answer === 'optionOne' ? 'success' : 'secondary'}>
                  Would you rather {question.optionOne.text}?
                  <ProgressBar variant="success" className="mt-3" now={optionOneCount/totalAnswerCount*100} label={`${optionOneCount/totalAnswerCount*100}%`} />
                  <span className="font-weight-bold text-center d-block">{optionOneCount} out of {totalAnswerCount} vote(s)</span>
                </Alert>
                <Alert key="optionTwo" variant={answer === 'optionTwo' ? 'success' : 'secondary'}>
                  Would you rather {question.optionTwo.text}?
                  <ProgressBar variant="success" className="mt-3" now={optionTwoCount/totalAnswerCount*100} label={`${optionTwoCount/totalAnswerCount*100}%`} />
                  <span className="font-weight-bold text-center d-block">{optionTwoCount} out of {totalAnswerCount} vote(s)</span>
                </Alert>
              </div>
            </div>
            </Card.Body>
          </Card>
        </div>
      ) 
      : (
        <div>
          <Card>
            <Card.Header>
              <Card.Subtitle className="my-1">
                {authorName} asks
              </Card.Subtitle>
            </Card.Header>
            <Card.Body className="p-3">
            <div className="d-flex align-items-center">
              <Card.Img className="card-img w-25" variant="top" src={authorAvatar} />
              <div className="border-left ml-3 pl-3 w-100">
                <Card.Text className="text-bold h5">Would you rather...</Card.Text>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio" id="radioOne" value="optionOne" defaulchecked="true" />
                  <label className="form-check-label" htmlFor="radioOne">
                    {question.optionOne.text}
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio" id="radioTwo" value="optionTwo" />
                  <label className="form-check-label" htmlFor="radioTwo">
                    {question.optionTwo.text}
                  </label>
                </div>
                <Button className="w-100 mt-4" variant="success" onClick={this.setOption}>Submit</Button>
              </div>
            </div>
            </Card.Body>
          </Card>
        </div>
      )
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const author = users[question.author];
  const user = users[authedUser];

  return {
    id,
    question,
    authorName: author.name,
    authorAvatar: author.avatarURL,
    user
  };
}

export default connect(mapStateToProps)(PollPage);
