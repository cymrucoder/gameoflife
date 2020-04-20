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
		  squares: Array(this.props.height * this.props.width).fill('white'),
		  width: this.props.width,
		  height: this.props.height,
	  };
  }
	
  renderSquare(i) {
    return (<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />);
  }
  
  drawGrid(h, w) {
	  
	  var rows = [];	  
	   
	  for (var i = 0; i < h; i++) {
		  var row = [];		  
		  for (var j = 0; j < w; j++) {
			  row.push(this.renderSquare((i * w) + j));
		  }
		  
		  rows.push(<div className="board-row">{row}</div>)
	  }
	  
	  return <div>{rows}</div>// This doesn't work if you just return the {rows} part - why not?
  }
  
  nextTurn() {
	  const squares = this.state.squares.slice();
	  
	  for (var square = 0; square < squares.length; square++) {
		  var count = 0;
		  
		  // Work out if the square being counted is on the edge of the grid
		  var rowStart = -1;		  
		  if (square % this.state.width == 0) { 
			rowStart = 0;
		  }
		  
		  var rowEnd = 1;		  
		  if (square % this.state.width == (this.state.width - 1)) {
			  rowEnd = 0;
		  }
		  
		  var columnStart = -1;		  
		  if (square < this.state.width) {
			  columnStart = 0;
		  }
		  
		  var columnEnd = 1;		  
		  if (square >= (this.state.width * (this.state.height - 1))) {
			  columnEnd = 0;
		  }
		  
		  // Count the number of neighbours
		  for (var i = rowStart; i <= rowEnd; i++) {
		   for (var j = columnStart; j <= columnEnd; j++) {
		  if (!(i == 0 && j == 0)) {
		  	var check = square + (j * this.state.width) + i;
		  	
		  	if (check >= 0 && check < (this.state.height * this.state.width)) {
		  		if (this.state.squares[check] == 'black') {
		  			count++;
		  		}
		  	}
		  }
		   }
		  }

		  // Empty square is filled if exactly three filled neighbours
		  if (this.state.squares[square] == 'white' && count == 3) {
			  squares[square] = 'black';
		  }
		  
		  // Filled square is emptied if less than 2 or more than 3 neighbours
		  if (this.state.squares[square] == 'black') {
			  if (count < 2 || count > 3) {
				squares[square] = 'white';
			}
		  }
	  }
	  
	  this.setState({squares: squares});
  }

  render() {
    return (
      <div>
		<button onClick={() => this.nextTurn()}>Next turn</button>
			{this.drawGrid(this.state.height,this.state.width)}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board height={25} width={40} />
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
