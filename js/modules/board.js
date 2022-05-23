/**
 * Updates board by going through each active tile and check and updates its neightbors accordingly.
 * @param  {Array}  board           2D array - game board to update
 * @param  {String} color           1 char string ['r', 'b', 'g', 'o']
 * @param  {Array}  arrayToCheck    An array of active tiles whose neighbors to check upon function call
 * @return {Array}                  A new array of coords of new tiles whose neighbors to check next time the function is called.
 */
 export function update(board, color, arrayToCheck) {
    if (arrayToCheck.length === 0) return [];
    
    const nextCallArray = [];
    arrayToCheck.forEach(tile => {
        board[tile.i][tile.j] = color.toUpperCase();

        //up
        if(tile.i > 0) {
            if (board[tile.i - 1][tile.j] === color) {
                nextCallArray.push({i: tile.i - 1, j: tile.j});
                board[tile.i - 1][tile.j] = color.toUpperCase();
            }
        }

        //bottom
        if (tile.i < board.length - 1){
            if (board[tile.i + 1][tile.j] === color) {
                nextCallArray.push({i: tile.i + 1, j: tile.j});
                board[tile.i + 1][tile.j] = color.toUpperCase();
            }
        }

        //right
        if (tile.j < board.length - 1) {
            if (board[tile.i][tile.j + 1] === color) {
                nextCallArray.push({i: tile.i, j: tile.j + 1});
                board[tile.i][tile.j + 1] = color.toUpperCase();
            }
        }
        
        //left
        if (tile.j > 0) {
            if (board[tile.i][tile.j - 1] === color) {
                nextCallArray.push({i: tile.i, j: tile.j - 1});
                board[tile.i][tile.j - 1] = color.toUpperCase();
            }
        }
    });
    
    return arrayToCheck.concat(update(board, color, nextCallArray));
}

export function getActiveColor({board, activeTilesCoords}) {
    return board[activeTilesCoords[0].i][activeTilesCoords[0].j];
}

export function log({board}) {
    // console.log(board);
}

export function isLevelCompleted({board}) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {            
            if ('rbgo'.includes(board[i][j])) {
                return false;
            }
        }
    }
    return true;
}