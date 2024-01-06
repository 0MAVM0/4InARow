document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const currentPlayerDisplay = document.getElementById('currentPlayer');

    let currentPlayer = 'red';
    let isGameOver = false;

    const checkForWin = () => {
        const cells = document.querySelectorAll('.cell');

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                const startCell = cells[row * 7 + col];
                if (
                    startCell.classList.contains(currentPlayer) &&
                    cells[row * 7 + col + 1].classList.contains(currentPlayer) &&
                    cells[row * 7 + col + 2].classList.contains(currentPlayer) &&
                    cells[row * 7 + col + 3].classList.contains(currentPlayer)
                ) {
                    return true;
                }
            }
        }

        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 3; row++) {
                const startCell = cells[row * 7 + col];
                if (
                    startCell.classList.contains(currentPlayer) &&
                    cells[(row + 1) * 7 + col].classList.contains(currentPlayer) &&
                    cells[(row + 2) * 7 + col].classList.contains(currentPlayer) &&
                    cells[(row + 3) * 7 + col].classList.contains(currentPlayer)
                ) {
                    return true;
                }
            }
        }

        for (let col = 0; col < 4; col++) {
            for (let row = 3; row < 6; row++) {
                const startCell = cells[row * 7 + col];
                if (
                    startCell.classList.contains(currentPlayer) &&
                    cells[(row - 1) * 7 + col + 1].classList.contains(currentPlayer) &&
                    cells[(row - 2) * 7 + col + 2].classList.contains(currentPlayer) &&
                    cells[(row - 3) * 7 + col + 3].classList.contains(currentPlayer)
                ) {
                    return true;
                }
            }
        }

        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 3; row++) {
                const startCell = cells[row * 7 + col];
                if (
                    startCell.classList.contains(currentPlayer) &&
                    cells[(row + 1) * 7 + col + 1].classList.contains(currentPlayer) &&
                    cells[(row + 2) * 7 + col + 2].classList.contains(currentPlayer) &&
                    cells[(row + 3) * 7 + col + 3].classList.contains(currentPlayer)
                ) {
                    return true;
                }
            }
        }

        return false;
    };

    const checkForDraw = () => {
        const cells = document.querySelectorAll('.cell');
        for (let cell of cells) {
            if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
                return false;
            }
        }
        return true;
    };

    const endGame = (result) => {
        isGameOver = true;
        message.textContent = result;
    };

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);
        }
    }

    board.addEventListener('click', function (e) {
        if (isGameOver) return;

        if (e.target.classList.contains('cell')) {
            const col = e.target.dataset.col;
            const cellsInCol = document.querySelectorAll(`.cell[data-col="${col}"]`);

            for (let i = cellsInCol.length - 1; i >= 0; i--) {
                const cell = cellsInCol[i];

                if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
                    cell.classList.add(currentPlayer);

                    if (checkForWin()) {
                        endGame(`Player ${currentPlayer === 'red' ? 'red' : 'yellow'} won!`);
                    } else if (checkForDraw()) {
                        endGame('Draw!');
                    } else {
                        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                        currentPlayerDisplay.textContent = currentPlayer;
                    }

                    break;
                }
            }
        }
    });
});
