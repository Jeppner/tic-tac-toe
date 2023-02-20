function Board() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
    // Render board
    const getBoard = () => board;

    const makeTurn = (row, column, player) {
        const availableCells = board.filter((row) => row[column].getValue === 0).map(row => row[column]);
        if (!availableCells.length) return;

    }

    return { getBoard, makeTurn };
}

function Cell() {
    let value = 0;
}

function GameController (
    playerOne = "Player One",
    playerTwo = "Player Two"
) {
    const board = Board();

    const players = [
        {
            name: playerOne,
            token: 1
        },
        {
            name: playerTwo,
            token: 2
        }
    ];

    let activePlayer = players[0];

    activePlayer = activePlayer === players[0] ? players[0] : players[i];

    const getActivePlayer = () => activePlayer;

    const displayNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn.`);
    }
}