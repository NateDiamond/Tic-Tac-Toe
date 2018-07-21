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

  renderSquare(i) {
    return <Square value = {this.props.squares[i]}
            onClick={()=>this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
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

  constructor(props) {
    super(props);
    this.state = { history: [{squares: Array(9).fill(null)}],
                   turn: true,
                   stepNumber: 0,
                   status: 'Next player: X'};
  }

  handleClick(i) {

    var history = this.state.history.slice(0,this.state.stepNumber + 1);
    var squares = (history[history.length - 1]).squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.turn ? 'X' : 'O';

    this.setState({history: history.concat({squares: squares}),
                   turn: !this.state.turn,
                   stepNumber: history.length});
  }

  jumpTo(move) {
    this.setState({turn: (move % 2) === 0,
      stepNumber: move
    });
  }

  render() {
    let status
    var winner = calculateWinner(this.state.history[this.state.stepNumber].squares);

    if(winner){
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (!this.state.turn ? 'X' : 'O');
    }

    const moves = this.state.history.map((step,move) => { //this function takes value then key
      const desc = move ? 'Go to move number #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick = {() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares = {this.state.history[this.state.stepNumber].squares}
                 onClick = {(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
            return squares[list[0]];
      }
    }
    return null;
}
