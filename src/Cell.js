import React, { useContext } from 'react';
import GameContext from './GameContext';

function Cell(props) {
    const {selected, setSelected, CELLS} = useContext(GameContext);

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('@@@@@shouldComponentUpdate');
    //     return true;
    // }
    // render () {
        // console.log('######', this.props);
        return <button className={`${CELLS[props.index].active?'active':''} ${props.matched?'matched':''}`} onClick={()=>{}}>
            <span className={`socks s${CELLS[props.index].value}`}>{CELLS[props.index].value}</span></button>;
    // }
}
export default Cell;