import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { handleAddNewQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  handleChange = (e) => {
    if (e.target.id === 'optionOneInput') {
      this.setState(() => ({ optionOneText: e.target.value }));
    }
    else {
      this.setState(() => ({ optionTwoText: e.target.value }));
    }
  }

  addNewQuestion = () => {
    this.props.dispatch(
      handleAddNewQuestion({
        author: this.props.authedUser,
        optionOneText: this.state.optionOneText,
        optionTwoText: this.state.optionTwoText
      })
    );
    
    this.props.history.push('/');
  }

  render() {
    
    if (!this.props.authedUser) {
      return (
        <div className="d-block text-center">
          <span className="d-block h3 my-5">You need to sign in to display this page.</span>
          <Link to="/"><Button variant="success">Sign in</Button></Link>
        </div>
      );
    }

    return (
      <Card>
        <Card.Header>
          <Card.Subtitle className="my-1 text-center">
            Create New Questions
          </Card.Subtitle>
        </Card.Header>
        <Card.Body className="p-3">
        <div className="d-flex align-items-center">
          <div className="w-100">
          <Card.Text className="text-bold text-muted h6 mb-4">Complete the question:</Card.Text>
          <Card.Text className="text-bold h5 my-3">Would you rather...</Card.Text>
          <div className="input-group">
            <input type="text" className="form-control" id="optionOneInput" onChange={this.handleChange} value={this.state.optionOneText} placeholder="Enter option one text here" />
          </div>
          <Card.Text className="text-bold h6 text-center my-2">OR</Card.Text>
          <div className="input-group">
            <input type="text" className="form-control" id="optionTwoInput" onChange={this.handleChange} value={this.state.optionTwoText} placeholder="Enter option two text here" />
          </div>
            <Button className="w-100 mt-3" variant="success" onClick={this.addNewQuestion} disabled={!this.state.optionOneText || !this.state.optionTwoText}>Submit</Button>
          </div>
        </div>
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default withRouter(connect(mapStateToProps)(NewQuestion));
