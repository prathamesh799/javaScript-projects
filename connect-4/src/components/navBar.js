import {Container, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
      <div>
          <Container fluid className="heading">
            <Row>
              <Col > <p className="heading-text">Connect-4</p> </Col>
              <Col ><Link className="atag" to="/">Home</Link></Col>
              <Col ><Link className="atag" to="/players">Game</Link></Col>
            </Row>
          </Container>
      </div>
    );
  }

export default Nav;