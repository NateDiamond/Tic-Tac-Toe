import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square"
       onClick= {() => props.onClick()}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {

  handleClick(i) {
    const squares = this.state.squares.slice();
    /*if(this.state.turn == 'X') {
      squares[i] = 'X';
      this.setState({squares: squares, turn: 'O'});
    } else {
      squares[i] = 'O';
      this.setState({squares: squares, turn: 'X'});
    }*/
    squares[i] = this.state.turn ? 'X' : 'O';
    this.setState({squares: squares,
                   turn: !this.state.turn});
  }

  constructor(props) {
    super(props);
    this.state = {squares: Array(9).fill(null),
                  turn: true};
  }

  renderSquare(i) {
    return <Square value = {this.state.squares[i]}
            onClick={()=>this.handleClick(i)}/>;
  }

  render() {
    var winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.turn ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for (var i = 0; i < lines.length; i++) {
      var list = lines[i];

      if (squares[list[0]] && squares[list[0]] === squares[list[1]] && squares[list[0]] === squares[list[2]]) {
            console.log(list);
            return squares[list[0]];
      }
    }
    return null;
}
