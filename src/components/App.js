import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import NavComponent from './NavComponent';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';

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
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/new-question" component={NewQuestion} />
                    <Route path="/leader-board" component={LeaderBoard} />
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

function mapStateToProps({ users }) {
  return {
    loading: users === null,
  };
}

export default connect(mapStateToProps)(App);
