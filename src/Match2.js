import { useState, React, useContext } from 'react';

import GameContext from './GameContext.js';
import Cell from './Cell.js';
import './Match2.css';

function Match2() {
    const {selected, setSelected, GameData} = useContext(GameContext);

    // constructor(props) {
    //     super(props);
    //     this.state = { game: this.props.cells.slice(), selected: []};
    //     this.handleSquareReset = this.handleSquareReset.bind(this);
    //     this.handleClick = this.handleClick.bind(this);
    // }
    // handleSquareReset(idx) {
    //     const data = this.state.game.slice();
    //     console.log('handleSquareReset ', idx, data[idx], this.state.selected);
    //     if(data[idx].active) {
    //         data[idx].active = false;
    //         this.setState({game: data});
    //     }
    //     if(this.state.selected.length === 1) {// reset if only 1 selected when timeout is triggered
    //         this.setState({selected: []});
    //     } else if (this.state.selected.length >= 2) {
    //         console.log('####', this.state.selected);
    //         const selected = this.state.selected.slice(2); 
    //         this.setState({selected: selected});
    //     }
    // }
    // handleClick(idx) {
    //     if (this.state.game[idx] && (this.state.game[idx].matched || this.state.game[idx].active)) {// exist if already matched or active(clicked)
    //         return;
    //     }
    //     // make copy of data
    //     const data = this.state.game.slice();
    //     const selected = this.state.selected.slice();

    //     selected.push(data[idx]);// track what's been clicked

    //     if (selected.length === 2 && selected[0].value === selected[1].value) {// have 2 matching clicked itmes
    //         data[selected[0].idx].matched = true;
    //         data[selected[1].idx].matched = true;
    //         data[selected[0].idx].active = false;
    //         data[selected[1].idx].active = false;
    //         this.setState({ selected: [] });// reset selected items
    //     } else {
    //         data[idx].active = true;
    //         this.setState({ selected: selected });
    //     }
    //     this.setState({ game: data });
    //     console.log('handleClick :', this.state.game[idx], this.state.selected);

    //     if(data[idx].active) {// only need to clear when items are not matched
    //         setTimeout(this.handleSquareReset.bind(this, idx), 1500);
    //     }
    // }
    return GameData.map((item) => <Cell key={item.idx} index={item.idx}/>)
}
export default Match2;