import { useSelector, useDispatch } from 'react-redux'
import { selectCell, resetCell } from './gameReducer.js'

function Cell(props) {
    const gameData = useSelector(state => state.game.gameData);
    const dispatch = useDispatch();

    function handleClick(index) {
        dispatch(selectCell({ index: index }));
        // NOTE: call setTimeoutout here, so we don't have to deal with state in reducer
        setTimeout(() => {
            dispatch(resetCell({ index: index }));
        }, 1000);
    }
    return (
        <button title={`Cell ${props.index + 1}`}
            className={`${gameData[props.index].active ? 'active' : ''} ${gameData[props.index].matched ? 'matched' : ''}`}
            onClick={() => handleClick(props.index)}>
            <span className={`socks s${gameData[props.index].value}`}></span>
        </button>
    );
}
export default Cell;