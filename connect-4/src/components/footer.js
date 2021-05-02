import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    return (
      <div>
          <Container fluid className="footer">
            <Row>
                <Col>Created by<a className="atag" href="https://github.com/prathamesh799"> Prathamesh</a>.</Col>
            </Row>
        </Container>
      </div>
    );
  }
  
export default Footer;