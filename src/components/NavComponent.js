import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser';

class NavComponent extends Component {
  handleLogout = () => {
    this.props.dispatch(setAuthedUser(''));

    this.props.history.push('/');
  }

  render() {
    const userId = this.props.authedUser;
    const user = this.props.users[userId];

    return (
      <Navbar bg="light">
        <div className="d-flex w-50 mx-auto">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/" exact activeClassName="active">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/add">
              New Question
            </NavLink>
            <NavLink className="nav-link" to="/leaderboard">
              Leader Board
            </NavLink>
          </Nav>
          {this.props.authedUser && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Image
                  src={user.avatarURL}
                  roundedCircle
                  style={{ width: '30px', cursor: 'pointer' }}
                />
                <span>
                  &nbsp; Hello, {user.name}
                  <button
                    className="btn btn-sm btn-outline-danger ml-4"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </button>
                </span>
              </Navbar.Text>
            </Navbar.Collapse>
          )}
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return { authedUser, users };
}

export default withRouter(connect(mapStateToProps)(NavComponent));

