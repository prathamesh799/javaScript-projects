import React from 'react'
import {Container, Row as R, Col, Form} from 'react-bootstrap'

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.tt = null
      this.state = {
        player1: 1,
        player2: 2,
        p1name: "",
        p2name: "",
        p1moves: 1,
        p2moves: 1,
        currentPlayer: null,
        board: [],
        gameOver: false,
        gameStarted:false,
        secs:0,
        mins:0,
        message: ''
        
      };
      
      // Bind play function to App component
      this.play = this.play.bind(this);
    }
    
    // Starts new game
    initBoard() {
      // Create a blank 6x7 matrix
      let board = [];
      for (let r = 0; r < 6; r++) {
        let row = [];
        for (let c = 0; c < 7; c++) { row.push(null) }
        board.push(row);
      }
      
      this.setState({
        board,
        currentPlayer: this.state.player1,
        gameOver: false,
        message: '',
        p1name:'',
        p2name:'',
        p1moves: 1,
        p2moves: 1,
        gameStarted:false,
        secs:0,
        mins:0
      });
    }
    
    togglePlayer() {
        let turn = null
        if (this.state.currentPlayer === this.state.player1) {
            this.setState({message: `${this.state.p2name}'s turn`})
            turn = this.state.player2

            const m = this.state.p1moves + 1;
            this.setState({p1moves:m})
        } else {
            this.setState({message:`${this.state.p1name}'s turn`})
            turn = this.state.player1

            const m = this.state.p2moves + 1;
            this.setState({p2moves:m})
        }
        return turn
    }

    renderTimer() {
      const tt = setInterval(() => {
        if (this.state.gameOver){clearInterval(tt)}
        const t = this.state.secs + 1;
        if (t==60) {
          const m = this.state.mins + 1;
          this.setState({
            secs:0,
            mins:m
          })
        }
        else {          
          this.setState({secs:t})
        }
      }, 1000);
    }
    
    play(c) {
      if (!this.state.gameOver) {
        if(this.state.p1name === '' || this.state.p2name === ''){
          alert("Please enter player names")
          return
        }
        if(this.state.gameStarted === false) {
          this.setState({gameStarted:true})
          console.log('game started')
          this.renderTimer();
        }

        // Place piece on board
        let board = this.state.board;
        for (let r = 5; r >= 0; r--) {
          if (!board[r][c]) {
            board[r][c] = this.state.currentPlayer;
            break;
          }
        }
  
        // Check status of board
        let result = this.checkAll(board);
        if (result === this.state.player1) {
          this.setState({ board, 
            gameOver: true, 
            message: `${this.state.p1name}(red) wins in ${this.state.p1moves} moves` });

        } else if (result === this.state.player2) {
          this.setState({ board, 
            gameOver: true, 
            message: `${this.state.p2name} (yellow) wins ${this.state.p2moves} moves` });

        } else if (result === 'draw') {
          this.setState({ board, gameOver: true, message: 'Draw game.' });
        } else {
          this.setState({ board, currentPlayer: this.togglePlayer() });
        }
      } else {
        this.setState({ message: 'Game over. Please start a new game.' });
        // clearInterval(tt)
      }
    }
    
    checkVertical(board) {
      // Check only if row is 3 or greater
      for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r - 1][c] &&
                board[r][c] === board[r - 2][c] &&
                board[r][c] === board[r - 3][c]) {
              return board[r][c];    
            }
          }
        }
      }
    }
    
    checkHorizontal(board) {
      // Check only if column is 3 or less
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r][c + 1] && 
                board[r][c] === board[r][c + 2] &&
                board[r][c] === board[r][c + 3]) {
              return board[r][c];
            }
          }
        }
      }
    }
    
    checkDiagonalRight(board) {
      // Check only if row is 3 or greater AND column is 3 or less
      for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r - 1][c + 1] &&
                board[r][c] === board[r - 2][c + 2] &&
                board[r][c] === board[r - 3][c + 3]) {
              return board[r][c];
            }
          }
        }
      }
    }
    
    checkDiagonalLeft(board) {
      // Check only if row is 3 or greater AND column is 3 or greater
      for (let r = 3; r < 6; r++) {
        for (let c = 3; c < 7; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r - 1][c - 1] &&
                board[r][c] === board[r - 2][c - 2] &&
                board[r][c] === board[r - 3][c - 3]) {
              return board[r][c];
            }
          }
        }
      }
    }
    
    checkDraw(board) {
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
          if (board[r][c] === null) {
            return null;
          }
        }
      }
      return 'draw';    
    }
    
    checkAll(board) {
      return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
    }
    
    componentWillMount() {
      this.initBoard();
    }

    inpNames = (e) => {
        const p = e.target.name
        if (this.state.gameStarted === false){
          this.setState({[p]:e.target.value})
        }
    }
    
    render() {
      // console.log("rendered")
      return (
        
        <div>
            <Container className="players-container">
                <R>
                    <Col className="text-center">
                        <Form.Control onChange={this.inpNames} name="p1name" value={this.state.p1name} className="player-inp-text" type="text" placeholder="Player 1" id="p1name"/>
                    </Col>

                    <Col className="text-center">
                        <Form.Control onChange={this.inpNames} name="p2name" value={this.state.p2name} className="player-inp-text" type="text" placeholder="Player 2" id="p2name"/>
                    </Col>
                </R> 
            </Container>
          <div className="button" onClick={() => {this.initBoard()}}>
              New Game
            </div>          
          <table>
            <thead>
            </thead>
            <tbody>
              {
                this.state.board.map((row, i) => (
                <Row key={i} row={row} play={this.play} />
              ))
              }
            </tbody>
          </table>
          <p id="timer-container">{Math.floor(this.state.mins)}:{this.state.secs}</p>
          {/* <Timer/> */}
          <p className="message">{this.state.message}</p>
        </div>
      );
    }
  }
  
  // Row component
  const Row = ({ row, play }) => {
    return (
      <tr>
        {
        row.map((cell, i) => 
          <Cell key={i} value={cell} columnIndex={i} play={play} />
        )}
      </tr>
    );
  };
  
  const Cell = ({ value, columnIndex, play }) => {
    let color = 'white';
    if (value === 1) {
      color = 'red';
    } else if (value === 2) {
      color = 'yellow';
    }
      
    return (
      <td>
        <div className="cell" onClick={() => {play(columnIndex)}}>
          <div className={color}></div>
        </div>
      </td>
    );
  };
  
  export default Game
