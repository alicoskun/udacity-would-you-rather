import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import NavComponent from './NavComponent';
import DashboardPage from './DashboardPage';
import NewQuestionPage from './NewQuestionPage';
import LeaderboardPage from './LeaderboardPage';
import PollPage from './PollPage';
import SignInComponent from './SignInComponent';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading === true ? null : (
            <Container fluid>
              <Row>
                <Col className="px-0 mx-auto mb-4">
                  <NavComponent />
                </Col>
              </Row>
              <Row>
                <Col sm={5} className="mx-auto">
                  <div>
                    {this.props.authedUser === '' ? <SignInComponent /> : (
                      <Switch>
                        <Route exact path="/" component={DashboardPage} />
                        <Route exact path="/question/:id" component={PollPage} />
                        <Route exact path="/add" component={NewQuestionPage} />
                        <Route exact path="/leaderboard" component={LeaderboardPage} />
                      </Switch>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    loading: users === null,
  };
}

export default connect(mapStateToProps)(App);
