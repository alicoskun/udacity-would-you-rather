import React, { Component } from 'react';
import { Card, Button, Alert, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleSetQuestionAnswer } from '../actions/questions';
import { withRouter } from 'react-router-dom';

class PollPage extends Component {  
  state = {
    selectedOption: 'optionOne',
  };
  
  handleChange = (e) => {
    const selectedOption = e.target.value;

    this.setState(() => ({ selectedOption }));
  }

  setOption = () => {
    const { id, user } = this.props;
    this.props.dispatch(
      handleSetQuestionAnswer({
        authedUser: user.id,
        qid: id,
        answer: this.state.selectedOption,
      })
    );
  }

  render() {
    const { id, question, authorName, authorAvatar, user, authedUser, loading } = this.props;
    

    if (loading) {
      return <span className="d-block h2 text-center">loading...</span>;
    }

    if (!authedUser) {
      return <span className="d-block text-center h3 mt-5">You need to log in to display this page.</span>
    }

    if (!question) {
      return <span className="d-block text-center h3 mt-5">This question does not exist!</span>
    }

    const answer = user.answers[id];
    const optionOneCount = question.optionOne.votes.length;
    const optionTwoCount = question.optionTwo.votes.length;
    const totalAnswerCount = optionOneCount + optionTwoCount;
    const progressOne = (optionOneCount / totalAnswerCount * 100).toFixed(0);
    const progressTwo = (optionTwoCount / totalAnswerCount * 100).toFixed(0);

    return (
      answer
      ? (
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
                  <ProgressBar variant="success" className="mt-3" now={progressOne} label={`${progressOne}%`} />
                  <span className="font-weight-bold text-center d-block">{optionOneCount} out of {totalAnswerCount} vote(s)</span>
                  {answer === 'optionOne' && (<span className="badge badge-warning d-inline-block">Voted</span>)}
                </Alert>
                <Alert key="optionTwo" variant={answer === 'optionTwo' ? 'success' : 'secondary'}>
                  Would you rather {question.optionTwo.text}?
                  <ProgressBar variant="success" className="mt-3" now={progressTwo} label={`${progressTwo}%`} />
                  <span className="font-weight-bold text-center d-block">{optionTwoCount} out of {totalAnswerCount} vote(s)</span>
                  {answer === 'optionTwo' && (<span className="badge badge-warning d-inline-block">Voted</span>)}
                </Alert>
              </div>
            </div>
            </Card.Body>
          </Card>
      ) 
      : (
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
                  <input className="form-check-input" type="radio" name="radio" id="radioOne" value="optionOne" checked={this.state.selectedOption === "optionOne"} onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="radioOne">
                    {question.optionOne.text}
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio" id="radioTwo" value="optionTwo" checked={this.state.selectedOption === "optionTwo"} onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="radioTwo">
                    {question.optionTwo.text}
                  </label>
                </div>
                <Button className="w-100 mt-4" variant="success" onClick={this.setOption}>Submit</Button>
              </div>
            </div>
            </Card.Body>
          </Card>
      )
    );
  }
}

function mapStateToProps({ authedUser, questions, users, loadingBar }, props) {
  if (!questions) {
    return {};
  }
  
  const { id } = props.match.params;
  const question = questions[id];
  const author = users[question.author];
  const user = users[authedUser];

  return {
    id,
    question,
    authorName: author.name,
    authorAvatar: author.avatarURL,
    user,
    authedUser,
    loading: loadingBar.default
  };
}

export default withRouter(connect(mapStateToProps)(PollPage));
