import { currentLevel } from "./modules/levels.js";
import { handleControlButtonPressed, handleGameStarted } from "./modules/eventHandlers.js";
import { DEFAULT, EVENTS, SELECTORS, LOCALSTORAGE, TEXT } from './modules/consts.js';

const topMenuInfo = {
    moves: currentLevel.moves,
    extra: DEFAULT.EXTRA,
    score: DEFAULT.SCORE
};

const playButton = document.querySelector(SELECTORS.BUTTONS.PLAY);
playButton.innerText = TEXT.PLAY;

const highScore = localStorage.getItem(LOCALSTORAGE.HIGHSCORE);
if (highScore) {
    playButton.innerText = TEXT.PLAYAGAIN;
    const highScoreElement = document.querySelector(SELECTORS.HIGHSCORE);
    highScoreElement.innerText = TEXT.HIGHSCORE + highScore;
    highScoreElement.classList.toggle('hide');
}

playButton.addEventListener(EVENTS.CLICK, (event) => {
    handleGameStarted(currentLevel, topMenuInfo);
});

document.querySelectorAll(SELECTORS.BUTTONS.CONTROL).forEach(button => {
    button.addEventListener(EVENTS.CLICK, () => {
        const color = [...button.classList].pop().charAt(0);
        handleControlButtonPressed(color, currentLevel, topMenuInfo);
    });
});
