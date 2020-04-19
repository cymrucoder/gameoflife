import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button 
		onClick={() => this.props.onClick()}
	    className="square" 
		style={{backgroundColor: this.props.value}}
	  >
        {''}
      </button>
    );
  }
}

class Board extends React.Component {
  handleClick(i) {
	  const squares = this.state.squares.slice();
	  squares[i] = (this.state.squares[i] == 'black' ? 'white' : 'black');
	  this.setState({squares: squares});
  }
	
  constructor(props) {
	  super(props);
	  this.state = {
		  squares: Array(25).fill('white'),
	  };
  }
	
  renderSquare(i) {
    return (<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />);
  }
  
  nextTurn() {
	  const squares = this.state.squares.slice();
	  
	  const size = 5;
	  
	  for (var square = 0; square < squares.length; square++) {
		  var count = 0;
		  
		  var rowStart = -1;		  
		  if (square % size == 0) { 
			rowStart = 0;
		  }
		  
		  var rowEnd = 1;		  
		  if (square % size == (size - 1)) {
			  rowEnd = 0;
		  }
		  
		  var columnStart = -1;		  
		  if (square < size) {
			  columnStart = 0;
		  }
		  
		  var columnEnd = 1;		  
		  if (square >= (size * (size - 1))) {
			  columnEnd = 0;
		  }
		  
		  for (var i = rowStart; i <= rowEnd; i++) {
			  for (var j = columnStart; j <= columnEnd; j++) {
				if (!(i == 0 && j == 0)) {
					var check = square + (j * size) + i;
					
					if (check >= 0 && check < (size * size)) {
						if (this.state.squares[check] == 'black') {
							count++;
						}
					}
				}
			  }
		  }
		  
		  console.log(square + " " + count);
		  
		  if (this.state.squares[square] == 'white' && count == 3) {
			  squares[square] = 'black';
		  }
		  
		  if (this.state.squares[square] == 'black') {
			  if (count < 2 || count > 3) {
				squares[square] = 'white';
			}
		  }
	  }
	  
	  this.setState({squares: squares});
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
		<button onClick={() => this.nextTurn()}>Next turn</button>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
		  {this.renderSquare(3)}
		  {this.renderSquare(4)}
        </div>
        <div className="board-row">
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
		  {this.renderSquare(8)}
		  {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
		  {this.renderSquare(13)}
		  {this.renderSquare(14)}
        </div>
		<div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
		  {this.renderSquare(18)}
		  {this.renderSquare(19)}
        </div>
		<div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
		  {this.renderSquare(23)}
		  {this.renderSquare(24)}
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
