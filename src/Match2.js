import { useSelector, useDispatch } from 'react-redux';
// import { useState } from 'react';
import { selectCell, resetCell, setTheme } from './gameReducer.js'
import Cell from './Cell.js';
import './Match2.css';

function Match2() {
    const gameData = useSelector(state => state.game.gameData);
    const clicks = useSelector(state => state.game.clicks);

    const dispatch = useDispatch();
    // const [option, setOption] = useState('shoes');

    function handleClick(evt) {
        if (confirm('This will reset your current game.\nContinue?')) {//eslint-disable-line
            const val = evt.target.value;
            dispatch(setTheme({ theme: val }));
        }
    }

    return (
        <>
            <div id="theme">
                Change Graphics:
                <select onChange={handleClick}>
                    <option key='socks'>socks</option>
                    <option key='shoes'>shoes</option>
                </select>
                <span id="clicks">Clicks: {clicks}</span>
            </div>
            <div>
                {gameData.map((item) => <Cell key={item.idx} index={item.idx} />)}
            </div>
        </>
    );
}
export default Match2;