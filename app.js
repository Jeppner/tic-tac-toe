const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
  
    const setSquare = (i, marker) => {
      if (i > board.length) return;
      board[i] = marker;
      console.log(board);
    }
    const getSquare = i => {
      if (i > board.length) return;
      return board[i];
    }
  
    const reset = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = "";
      }
    }
  
    return { setSquare, getSquare, reset };
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
  
    const playRound = (i) => {
      gameBoard.setSquare(i, getCurrentMarker());
      round++;
      console.log(round);
    }
  
    const getCurrentMarker = () => {
      return round % 2 === 1 ? playerOne.getMarker() : playerTwo.getMarker();
    }
  
    if(round === 9) {
      return isOver = true;
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
        square.innerHTML = getCurrentMarker();
        const currentSquareIndex = square.getAttribute('data-attribute');
        gameController.playRound(currentSquareIndex);
      });
    };
  
    squares.forEach(square => {
      addClickHandler(square, gameController.getCurrentMarker);
    });
  
    reset.addEventListener("click", () => {
      squares.forEach(square => {
        square.innerHTML = '';
      })
    })
  
  })();
  