import { createSelector, createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash'

export const initialState = {
    bowl: "bowl5",
    decorations: [
        "meat",
        "pepper"
    ]
}

const reducers = {
    setBowl: (state, { payload: { bowl } }) => {
        state.bowl = bowl;
    },
    setDecoration: (state, { payload: decoration }) => {
        var isFind = state.decorations.includes(decoration);

        if (isFind) {
            _.remove(state.decorations, (n) => {
                return n === decoration;
            })
        } else {
            state.decorations.push(decoration);
        }
    }
}

const name = "TRAY"

const slice = createSlice({
    name,
    initialState,
    reducers
})

const selectBowlState = createSelector(
    (state) => state.bowl,
    (bowl) => bowl
)
const selectDecorations = createSelector(
    (state) => state.decorations,
    (decorations) => decorations
)

export const traySelector = {
    bowl: (state) => selectBowlState(state[TRAY]),
    decorations: (state) => selectDecorations(state[TRAY])
}

export const TRAY = slice.name
export const trayReducer = slice.reducer
export const trayAction = slice.actions