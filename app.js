const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const setSquare = (i, marker) => {
    if (i > board.length || board[i] != '') return;
    board[i] = marker;
  }
  const getSquare = i => {
    if (i > board.length) return;
    return board[i];
  }

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
    return gameController.gameOverReset();
  }

  return { board, setSquare, getSquare, reset };
})();

function Player(marker) {
  this.marker = marker;

  const getMarker = () => { return marker };

  return { getMarker };
}


const gameController = (() => {
  const playerOne = Player("X");
  const playerTwo = Player("O");

  let round = 1;
  let winner = null;
  let gameOver = false;

  const squares = document.querySelectorAll('.square');

  if(round === 9) {
      return gameOver = true;
    }
    
  const getCurrentMarker = () => {
    return round % 2 === 1 ? playerOne.getMarker() : playerTwo.getMarker();
  }

  const getCurrentPlayer = () => {
    if(gameOver) {
      console.log(winner);
      if(winner) {
        return winner === 'draw' ? 'It was a draw! Play again?' : `The winner is ${winner}!`;
      } else {
        return 'It was a draw! Play again?';
      }
    } else {
      return round % 2 === 1 ? 'Player One' : 'Player Two';
    }
  }

  function checkForWinner() {
    const board = gameBoard.board;
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    // check if the current move resulted in a draw
    if (board.every(square => square !== '')) {
      return 'draw';
    }
  
    return null;
  }
  
  const playRound = (i) => {
    gameBoard.setSquare(i, getCurrentMarker());
    winner = checkForWinner(i); // update the winner based on the return value of checkForWinner()
    if (winner) {
      gameOver = true;
      displayController.setMessage();
    }
    round++;
  
    if (gameOver) {
      squares.forEach(square => {
        square.setAttribute('disabled', '');
      });
    }
  }
  
  const gameOverReset = () => {
    gameOver = false;
    round = 1;
    winner = null;
  }

  return { playRound, getCurrentMarker, checkForWinner, gameOverReset, getCurrentPlayer }
})();

const displayController = (() => {
  const squares = document.querySelectorAll('.square');
  const message = document.querySelector('.message');
  const reset = document.querySelector('.reset');

  squares.forEach((square, i) => {
    square.setAttribute('data-attribute', i);
  });

  const addClickHandler = (square, getCurrentMarker) => {
    square.addEventListener("click", () => {
      if(square.textContent != '') return;
      square.textContent = getCurrentMarker();
      square.setAttribute('disabled', '');
      const currentSquareIndex = square.getAttribute('data-attribute');
      setMessage();
      return gameController.playRound(currentSquareIndex);
    });
  };

  const setMessage = () => {
      message.textContent = gameController.getCurrentPlayer()
  }

  squares.forEach(square => {
    addClickHandler(square, gameController.getCurrentMarker);
  });

  reset.addEventListener("click", () => {
    squares.forEach(square => {
      square.innerHTML = '';
      square.removeAttribute('disabled');
      gameBoard.reset();
    })
  })

  return { setMessage }

})();
