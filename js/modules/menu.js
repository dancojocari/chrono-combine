import { SELECTORS, TEXT } from "./consts.js";

export function update(topMenuInfo) {
    document.querySelector(SELECTORS.TOP_MENU.MOVES).innerText = TEXT.MOVES + topMenuInfo.moves;
    document.querySelector(SELECTORS.TOP_MENU.EXTRA).innerText = TEXT.EXTRA + topMenuInfo.extra;
    document.querySelector(SELECTORS.TOP_MENU.SCORE).innerText = TEXT.SCORE + topMenuInfo.score;
}

export function toggle() {
    [...document.querySelector('.container').children].forEach(child => child.classList.toggle('hide'));
}