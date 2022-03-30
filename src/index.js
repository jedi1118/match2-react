import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Cell extends React.Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('@@@@@shouldComponentUpdate');
    //     return true;
    // }
    render () {
        // console.log('######', this.props);
        return <button className={`${this.props.active?'active':''} ${this.props.matched?'matched':''}`} onClick={this.props.handleClick.bind(this, this.props.idx)}>
            <span className={`socks s${this.props.value}`}></span></button>;
    }
}

class Match2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { game: this.props.cells.slice(), selected: []};
        this.handleSquareReset = this.handleSquareReset.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleSquareReset(idx) {
        const data = this.state.game.slice();
        console.log('handleSquareReset ', idx, data[idx], this.state.selected);
        if(data[idx].active) {
            data[idx].active = false;
            this.setState({game: data});
        }
        if(this.state.selected.length === 1) {// reset if only 1 selected when timeout is triggered
            this.setState({selected: []});
        } else if (this.state.selected.length >= 2) {
            console.log('####', this.state.selected);
            const selected = this.state.selected.slice(2); 
            this.setState({selected: selected});
        }
    }
    handleClick(idx) {
        if (this.state.game[idx] && (this.state.game[idx].matched || this.state.game[idx].active)) {// exist if already matched or active(clicked)
            return;
        }
        // make copy of data
        const data = this.state.game.slice();
        const selected = this.state.selected.slice();

        selected.push(data[idx]);// track what's been clicked

        if (selected.length === 2 && selected[0].value === selected[1].value) {// have 2 matching clicked itmes
            data[selected[0].idx].matched = true;
            data[selected[1].idx].matched = true;
            data[selected[0].idx].active = false;
            data[selected[1].idx].active = false;
            this.setState({ selected: [] });// reset selected items
        } else {
            data[idx].active = true;
            this.setState({ selected: selected });
        }
        this.setState({ game: data });
        console.log('handleClick :', this.state.game[idx], this.state.selected);

        if(data[idx].active) {// only need to clear when items are not matched
            setTimeout(this.handleSquareReset.bind(this, idx), 1500);
        }
    }
    render () {
        return this.props.cells.map((item) => <Cell key={item.idx} {...item} handleClick={this.handleClick}/>)
    } 
}

Array.prototype.shuffle = function() {
    var i = this.length, j, temp;
    if ( i == 0 ) return this;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}


const CELLS = [];
const SOCKS_LEN = 21;// number of socks in sprite
const MAX_CELLS = 36;// 6 x 6 grid

// setting up the game data:
// create a list of socks, the value will be used for matching as well as icon
let SOCKS = [];
for (let i = 0; i < SOCKS_LEN; i++) {
    SOCKS.push(i);
}
SOCKS.shuffle();// randomize
for(let i = 0; i < 3; i++) {
    SOCKS = SOCKS.slice(0, 18);// take first 18, as we only have 36 cells
}
SOCKS = SOCKS.concat(SOCKS);// double the icons
SOCKS.shuffle();// randomize again
// console.log('##########', SOCKS);

for(let i = 0; i < MAX_CELLS; i++) {
    CELLS.push({
        idx: i,
        value: SOCKS[i],
        matched: false, 
        active: false
    });
}
// init game
ReactDOM.render(<Match2 cells={CELLS}/>, document.getElementById('root'));

