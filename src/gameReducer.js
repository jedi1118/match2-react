import { createSlice } from "@reduxjs/toolkit";
import initData from "./GameData";
const gameSlice = createSlice({
    name: 'game',
    initialState: {// add some demo data
        selected: [],
        gameData: initData('socks'),
        theme: 'socks',
        clicks: 0,
        comparing: false, // prevent new selections while two cells are being compared
        won: false         // win flag when all pairs matched
    },
    reducers: {
        selectCell: (state, data) => {
            const index = data.payload.index;
            // ignore if already active, already matched, or currently comparing
            if (state.gameData[index].active || state.gameData[index].matched || state.comparing) return;
            state.clicks += 1;
            state.selected.push(data);
            state.gameData[index].active = true;

            if (state.selected.length >= 2) {
                const idx1 = state.selected.shift().payload.index;
                const idx2 = state.selected.shift().payload.index;
                state.comparing = true; // lock input while comparing

                // check if pair is matched
                if (state.gameData[idx1].value === state.gameData[idx2].value) {
                    state.gameData[idx1].matched = true;
                    state.gameData[idx2].matched = true;
                }
            }
        },
        resetCell: (state, data) => {
            const index = data.payload.index;
            state.gameData[index].active = false;

            // if both selected cells have been reset, unlock and check win
            const allReset = state.selected.length === 0 && !state.comparing;
            if (!allReset) return;

            // check if all cells are matched (win condition)
            const allMatched = state.gameData.every(cell => cell.matched);
            if (allMatched) {
                state.won = true;
            }
        },
        setTheme: (state, data) => {
            state.theme = data.payload.theme;
            state.selected = [];
            state.comparing = false;
            state.won = false;
            state.clicks = 0;
            state.gameData = initData(data.payload.theme);
        }
    }
});

export const { selectCell, resetCell, setTheme } = gameSlice.actions;
export default gameSlice.reducer;