// eslint-disable-next-line no-extend-native
Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i === 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

// initialize game data
const CELLS = [];
const SOCKS_LEN = 25;// number of socks in sprite
const MAX_CELLS = 36;// 6 x 6 grid

// setting up the game data:
// create a list of socks, the value will be used for matching as well as icon
let SOCKS = [];
for (let i = 0; i < SOCKS_LEN; i++) {
    SOCKS.push(i);
}
SOCKS.shuffle();// randomize
for (let i = 0; i < 3; i++) {
    SOCKS = SOCKS.slice(0, 18);// take first 18, as we only have 36 cells
}
SOCKS = SOCKS.concat(SOCKS);// double the icons
SOCKS.shuffle();// randomize again
// console.log('##########', SOCKS);

for (let i = 0; i < MAX_CELLS; i++) {
    CELLS.push({
        idx: i,
        value: SOCKS[i],
        matched: false,
        active: false
    });
}
const GameData = CELLS;
export default GameData;

