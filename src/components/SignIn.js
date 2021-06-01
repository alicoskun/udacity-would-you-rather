import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser';

class SignIn extends Component {
  state = {
    selectedUser: '',
  };
  
  handleChange = (e) => {
    const selectedUser = e.target.value === 'Select user' ? '' : e.target.value;

    this.setState(() => ({ selectedUser }));
  }

  setAuthedUser = () => {
    this.props.dispatch(setAuthedUser(this.state.selectedUser));
  }

  render() {
    return (
      <Card className="text-center">
        <Card.Header>
          <Card.Title>Welcome to the Would You Rather App!</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Please sign in to continue
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Img className="card-img w-50 my-5" variant="top" src="react-redux.png" />
          <Card.Text className="h3 text-success mb-4">
            Sign in
          </Card.Text>
          <select className="form-control" value={this.state.selectedUser} onChange={this.handleChange}>
            <option>Select user</option>
            {this.props.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <Button className="w-100 mt-3" disabled={!this.state.selectedUser} variant="success" onClick={this.setAuthedUser}>Sign In</Button>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users).map(user => users[user])
  };
}

export default connect(mapStateToProps)(SignIn);
