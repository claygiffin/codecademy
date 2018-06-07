import {Board} from './board.js';

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game over, buttface');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('You won, hurray!');
      this._board.print();
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}