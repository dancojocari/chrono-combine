import { update } from './board.js';

export let currentLevel = generateNewLevel();

export function getNextLevel() {
    currentLevel = generateNewLevel();
}

function generateNewLevel() {
    let activeTilesCoords = getRandomActiveTilesCoords();
    const board = [];
    for (let i = 0; i < 7; i++){
        board.push([]);
        for (let j = 0; j < 7; j++) {
            board[i].push('rgbo'.charAt(Math.floor(Math.random() * 4)));
        }
    }
    activeTilesCoords = update(board, board[activeTilesCoords[0].i][activeTilesCoords[0].j], activeTilesCoords)
    const solutionArray = [];
    const movesObj = {
        moves: 49
    };
    buildPossibilities(board, activeTilesCoords, [], solutionArray, movesObj);
    // console.table(solutionArray.filter(solution => solution.length <= movesObj.moves));
    let moves = movesObj.moves;
    return {moves, board, activeTilesCoords}
}

function getRandomActiveTilesCoords() {
    return [
        {
            i: Math.floor(Math.random() * 7),
            j: Math.floor(Math.random() * 7),
        }
    ];
}

function buildPossibilities(board, activeTilesCoords, arr, solutionArray, movesObj) {
    if (arr.length > movesObj.moves) return;
    const colors = getColorsAroundActiveTiles(board, activeTilesCoords);
    if (colors.length === 0) {
        if (arr.length <= movesObj.moves) {
            movesObj.moves = arr.length;
            solutionArray.push(arr);
        }
        return;
    }

    colors.forEach(color => {
        const boardCopy = getBoardCopy(board);
        let tilesCopy = getActiveTilesCoordsCopy(activeTilesCoords);
        let arrCopy = [...arr];

        tilesCopy = update(boardCopy, color, tilesCopy);
        arrCopy.push(color);
        buildPossibilities(boardCopy, tilesCopy, arrCopy, solutionArray, movesObj);
    });
}

function getColorsAroundActiveTiles(board, activeTilesCoords) {
    const activeColor = board[activeTilesCoords[0].i][activeTilesCoords[0].j];
    const colorSet = new Set();
    activeTilesCoords.forEach(({i, j}) => {
        //up
        if(i > 0) {
            if (board[i - 1][j] !== activeColor) {
                colorSet.add(board[i - 1][j]);
            }
        }

        //bottom
        if (i < board.length - 1){
            if (board[i + 1][j] !== activeColor) {
                colorSet.add(board[i + 1][j]);
            }
        }

        //right
        if (j < board.length - 1) {
            if (board[i][j + 1] !== activeColor) {
                colorSet.add(board[i][j + 1]);
            }
        }
        
        //left
        if (j > 0) {
            if (board[i][j - 1] !== activeColor) {
                colorSet.add(board[i][j - 1]);
            }
        }
    });
    return [...colorSet];
}

function getBoardCopy(board) {
    const newBoard = [];
    board.forEach(row => {
        newBoard.push([...row]);
    });
    return newBoard;
}

function getActiveTilesCoordsCopy(activeTilesCoords) {
    const copy = [];
    activeTilesCoords.forEach(({i, j}) => {
        copy.push({i, j});
    });
    return copy;
}
