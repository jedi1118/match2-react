import { useSelector, useDispatch } from 'react-redux'
import { selectCell, resetCell } from './gameReducer.js'

let timeouts = {}; // track timeouts per index to prevent stale dispatches

function Cell(props) {
    const gameData = useSelector(state => state.game.gameData);
    const theme = useSelector(state => state.game.theme);
    const comparing = useSelector(state => state.game.comparing);
    const won = useSelector(state => state.game.won);
    const dispatch = useDispatch();

    function handleClick(index) {
        // prevent double-clicks during comparison window
        if (timeouts[index]) return;

        dispatch(selectCell({ index: index }));

        timeouts[index] = setTimeout(() => {
            delete timeouts[index];
            dispatch(resetCell({ index: index }));
        }, 1000);
    }

    const cell = gameData[props.index];
    return (
        <button
            title={`Cell ${props.index + 1}`}
            aria-label={cell.matched ? `Matched` : `Cell ${props.index + 1}`}
            disabled={cell.active || cell.matched || comparing}
            className={`${cell.active ? 'active' : ''} ${cell.matched ? 'matched' : ''}`}
            onClick={() => handleClick(props.index)}
        >
            <span className={`${theme} s${cell.value}`}></span>
        </button>
    );
}
export default Cell;