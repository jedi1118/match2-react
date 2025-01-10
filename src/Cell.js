import React, { useContext } from 'react';
import GameContext from './GameContext';

function Cell(props) {
    const { selected, setSelected, GameData } = useContext(GameContext);

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('@@@@@shouldComponentUpdate');
    //     return true;
    // }
    return <button className={`${GameData[props.index].active ? 'active' : ''} ${props.matched ? 'matched' : ''}`} onClick={() => { }}>
        <span className={`socks s${GameData[props.index].value}`}>{GameData[props.index].value}</span></button>;
}
export default Cell;