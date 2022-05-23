import { currentLevel, getNextLevel } from "./levels.js";

import * as Menu from "./menu.js";
import * as Tiles from "./tiles.js";
import * as Board from "./board.js";
import * as Toast from "./toast.js";
import { DEFAULT, SELECTORS, LOCALSTORAGE, TIME, TEXT } from "./consts.js";

export function handleControlButtonPressed(color, level, topMenuInfo) {
    if (Board.getActiveColor(level) === color.toUpperCase()) return; // is same button was pressed, return

    topMenuInfo.moves -= 1;
    
    if (topMenuInfo.moves < 0) {
        topMenuInfo.moves = 0;
        topMenuInfo.extra -= 1;
    }
    
    Menu.update(topMenuInfo);
    level.activeTilesCoords = Board.update(level.board, color, level.activeTilesCoords);
    Tiles.draw(level);

    if (isGameOver(topMenuInfo)) {
        updateHighScore(topMenuInfo);
        getNextLevel();
        document.querySelectorAll('.control-button').forEach(button => button.disabled = !button.disabled);
        Toast.show(SELECTORS.TOAST.GAMEOVER, TIME.GAMEOVER - 300);
        setTimeout(() => {
            topMenuInfo.moves = currentLevel.moves;
            topMenuInfo.score = DEFAULT.SCORE;
            topMenuInfo.extra = DEFAULT.EXTRA;
            document.querySelectorAll('.control-button').forEach(button => button.disabled = !button.disabled);
            Menu.toggle();
            document.querySelector(SELECTORS.BOARD).innerHTML = '';
        }, TIME.GAMEOVER);
    } 
    else if (Board.isLevelCompleted(level)) {
        getNextLevel();
        Toast.show(SELECTORS.TOAST.SUCCESS, TIME.LEVELCOMPLETED - 300);
        document.querySelectorAll('.control-button').forEach(button => button.disabled = !button.disabled);
        setTimeout(() => {
            document.querySelectorAll('.control-button').forEach(button => button.disabled = !button.disabled);
            switchToNextLevel(currentLevel, topMenuInfo);
        }, TIME.LEVELCOMPLETED);
    }
}

function updateHighScore({score}) {
    const highScore = localStorage.getItem(LOCALSTORAGE.HIGHSCORE);
    const highScoreElement = document.querySelector(SELECTORS.HIGHSCORE);
    if (highScore === null) {
        localStorage.setItem(LOCALSTORAGE.HIGHSCORE, score);
        highScoreElement.innerText = TEXT.HIGHSCORE + score;
        highScoreElement.classList.toggle('hide');
    } else {
        if (score > highScore) {
            localStorage.setItem(LOCALSTORAGE.HIGHSCORE, score);
            highScoreElement.innerText = TEXT.HIGHSCORE + score;
        }
    }
}

export function handleGameStarted(level, topMenuInfo) {
    Menu.toggle();
    Tiles.create(level);
    Menu.update(topMenuInfo);
    Tiles.draw(level);
    Toast.init();
}

function switchToNextLevel(level, topMenuInfo) {
    topMenuInfo.moves = level.moves;
    topMenuInfo.score += 1;
    Menu.update(topMenuInfo);
    Tiles.draw(level);
}

function isGameOver({moves, extra }) {
    return moves <= 0 && extra <= 0;
}