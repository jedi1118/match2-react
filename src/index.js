import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

console.log('#####');

class Cell extends React.Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('@@@@@shouldComponentUpdate');
    //     return true;
    // }
    render () {
        console.log('######', this.props);
        return <button className={`${this.props.active?'active':'foo'} ${this.props.matched?'matched':''}`} onClick={this.props.handleClick.bind(this, this.props.idx)} >{this.props.value}</button>;
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
        console.log('handleSquareReset ', idx, this);
        const data = this.state.game.slice();
        if(data[idx].active) {
            data[idx].active = false;
            this.setState({game: data});
        }
        if(this.state.selected.length > 0) {// reset if only 1 selected when timeout is triggered
            this.setState({selected: []});
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
    
        if(data[idx].active) {// only need to clear when items are not matched
            console.log('handleClick - needs reset', this.state.game[idx]);
            setTimeout(this.handleSquareReset.bind(this, idx), 2000);
        }
    }
    render () {
        return this.props.cells.map((item) => <Cell key={item.idx} {...item} handleClick={this.handleClick}/>)
    } 
}

const CELLS = [];
for(let i = 0; i < 4; i++) {
    CELLS.push({
        idx: i,
        value: i%2 === 0 ? 'A' : 'B',
        matched: false, 
        active: false,
        // countDown: 2
    });
}
ReactDOM.render(<Match2 cells={CELLS}/>, document.getElementById('root'));

