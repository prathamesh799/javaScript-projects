import {Container, Row, Col, Form} from 'react-bootstrap'

const Players = () => {
    return (
      <Container className="players-container">
        <Row>
              <Col>
                <Form.Control className="player-inp-text" type="text" placeholder="Player 1" />
              </Col>
        
            <Col>
              <Form.Control className="player-inp-text" type="text" placeholder="Player 2" />
            </Col>
        </Row> 
      </Container>
    );
  }
  
export default Players;