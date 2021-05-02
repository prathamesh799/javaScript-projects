import {Container} from 'react-bootstrap'

const Rules = () => {
    return (
      <div className="rules-heading-container">
          <Container fluid className="rules-heading">
            <h4>How to play Connect 4</h4>
            <ol>
                <li>Decide who plays first. Players will alternate turns after playing a checker.</li>
                <li>On your turn, drop one of your checkers down any of the slots in the top of the grid.</li>
                <li>Play alternates until one player gets FOUR checkers of his or her color in a row .The four in a row can be horizontal, vertical, or diagonal</li>
            </ol>
        </Container>
      </div>
    );
  }
  
export default Rules;