// Get DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

// Game state variables
let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// Event listener for each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Event listener for the restart button
restartBtn.addEventListener('click', restartGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Check if the move is valid (cell is empty and game is active)
    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Place the player's mark
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer === 'X' ? 'x-mark' : 'o-mark');

    // Check for a win or draw
    checkResult();
}
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    // Check for a draw
    let roundDraw = !boardState.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = `Game is a draw!`;
        gameActive = false;
        return;
    }

    // If no win or draw, switch players
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.innerHTML = `Player ${currentPlayer}'s Turn`;

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('x-mark', 'o-mark');
    });
}