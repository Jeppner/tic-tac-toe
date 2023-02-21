const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
  
    const setSquare = (i, marker) => {
      if (i > board.length || board[i] != '') return;
      board[i] = marker;
      console.log(board);
    }
    const getSquare = i => {
      if (i > board.length) return;
      return board[i];
    }
  
    const reset = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = '';
      }
      return;
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
    let gameOver = false;

    if(round === 9) {
        return isOver = true;
      }
  
    const playRound = (i) => {
      gameBoard.setSquare(i, getCurrentMarker());
      checkForWinner();
      round++;
    }
  
    const getCurrentMarker = () => {
      return round % 2 === 1 ? playerOne.getMarker() : playerTwo.getMarker();
    }
  
    function checkForWinner (board) {
        board = gameBoard.board;
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations
        .filter((combination) => 
        combination.every)
    }
  
    return { playRound, getCurrentMarker }
  })();
  
  const displayController = (() => {
    const squares = document.querySelectorAll('.square');
    const message = document.querySelector('.message');
    const reset = document.querySelector('.reset');
  
    squares.forEach((square, i) => {
      square.setAttribute('data-attribute', i);
    });
  
    const addClickHandler = (square, getCurrentMarker) => {
      square.addEventListener("click", e => {
        if(square.textContent != '') return;
        square.textContent = getCurrentMarker();
        // square.setAttribute('disabled', '');
        const currentSquareIndex = square.getAttribute('data-attribute');
        return gameController.playRound(currentSquareIndex);
      });
    };
  
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

  })();
  