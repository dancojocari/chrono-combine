import { getTileClassName } from "./utils.js";

export function create({board}) {
    const boardElement = document.querySelector('.board');
    if (boardElement) {
        board.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');
            rowElement.setAttribute('class', 'row');
            row.forEach((tile, tileIindex) => {
                const tileElement = document.createElement('div');
                tileElement.setAttribute('class', getTileClassName(tile));
                tileElement.setAttribute('id', `tile-${rowIndex}-${tileIindex}`);
                rowElement.append(tileElement);
            });
            boardElement.append(rowElement);
        });
    }
}

export function draw({board}) {
    board.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
            const selectorName = `#tile-${rowIndex}-${tileIndex}`;
            const tileElement = document.querySelector(selectorName);
            if (tileElement) {
                tileElement.setAttribute('class', getTileClassName(tile));
            }
        });
    });
}
