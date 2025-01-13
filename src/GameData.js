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

const SOCKS_LEN = 25;// number of socks in sprite
const SHOES_LEN = 18;// number of shoes in sprite
const MAX_CELLS = 36;// 6 x 6 grid

// initialize game data
function initData(theme) {
    let data = [];
    // setting up the game data:
    // create a list of socks, the value will be used for matching as well as icon
    const len = theme === "shoes" ? SHOES_LEN : SOCKS_LEN;
    for (let i = 0; i < len; i++) {
        data.push(i);
    }
    data.shuffle();// randomize
    for (let i = 0; i < 3; i++) {
        data = data.slice(0, 18);// take first 18, as we only have 36 cells
    }
    data = data.concat(data);// double the icons
    data.shuffle();// randomize again
    let CELLS = [];
    for (let i = 0; i < MAX_CELLS; i++) {
        CELLS.push({
            idx: i,
            value: data[i],
            matched: false,
            active: false
        });
    }
    return CELLS;
}
export default initData;

