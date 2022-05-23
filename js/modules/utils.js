function getTileColor(tile) {
    switch(tile) {
        case 'r': 
            return 'red';
        case 'b':
            return 'blue';
        case 'g':
            return 'green';
        case 'o':
            return 'orange';
        default:
            return '';
    }
}

function getGlowColor(color) {
    switch(color) {
        case 'red':
            return 'glow-blue';
        case 'blue':
            return 'glow-red';
        case 'green':
            return 'glow-orange';
        case 'orange':
            return 'glow-green';
        default:
            return '';
    }
}

export function getTileClassName(tile) {
    let className = getTileColor(tile.toLowerCase());
    if (tile.toUpperCase() === tile) {
        className += '-active ' + getGlowColor(className);
    }

    return 'tile ' + className;
}

export function loadFromLocalStorage(itemName, valueIfNull) {
    const item = localStorage.getItem(itemName);
    return item ? +item : valueIfNull;
} 