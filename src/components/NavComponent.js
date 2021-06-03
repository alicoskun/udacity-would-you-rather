import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser';

const NavComponent = (props) => {
  const { users, authedUser, history, dispatch } = props;

  const handleLogout = () => {
    dispatch(setAuthedUser(''));
    history.push('/');
  }

  const userId = authedUser;
  const user = users[userId];

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
        {authedUser && (
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
                  onClick={handleLogout}
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

function mapStateToProps({ authedUser, users }) {
  return { authedUser, users };
}

export default withRouter(connect(mapStateToProps)(NavComponent));

