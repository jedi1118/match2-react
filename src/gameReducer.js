import { createSlice } from "@reduxjs/toolkit";
import GameData from "./GameData";

const gameSlice = createSlice({
    name: 'game',
    initialState: {// add some demo data
        selected: [],
        gameData: GameData
    },
    reducers: {
        selectCell: (state, data) => {
            // is already clicked, exit
            const index = data.payload.index;
            if (state.gameData[index].active) return;

            // add to the selected list
            state.selected.push(data);
            state.gameData[index].active = true;

            if (state.selected.length >= 2) {
                const idx1 = state.selected.shift().payload.index;
                const idx2 = state.selected.shift().payload.index;

                // check if pair is matched
                if (state.gameData[idx1].value === state.gameData[idx2].value) {
                    state.gameData[idx1].matched = state.gameData[idx2].matched = true;
                }
            }
        },
        resetCell: (state, data) => {
            // NOTE: instead of calling  setTimeout here - which we will lose reference to state,
            // call setTimeout in the dispatch code - in Cell.js
            const index = data.payload.index;
            state.gameData[index].active = false;
        }
    }
});

export const { selectCell, resetCell } = gameSlice.actions;
export default gameSlice.reducer;