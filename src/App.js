import { Container, Row, Col, Navbar, Nav, Card, Button } from 'react-bootstrap';

function App() {
  return (
    <Container fluid className="px-0">
      <Row>
        <Col className="mx-auto mb-4">
          <Navbar bg="light">
            <div className="d-flex w-50 mx-auto">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col sm={6} className="mx-auto">
          <Card className="text-center">
            <Card.Header>
              <Card.Title>Welcome to the Would You Rather App!</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Please sign in to continue
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Sign in
              </Card.Text>
              <Card.Img variant="top" src="../../public/react-redux.png" />
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
