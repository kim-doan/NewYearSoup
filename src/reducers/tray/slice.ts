import { createSelector, createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash'

export const initialState = {
    success: false,
    isLoading: false,
    error: "",

    bowl: "bowl1",
    decorations: [],
    message: "",
    soupImgId: "",
}

const reducers = {
    setBowl: (state, { payload: bowl }) => {
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
    },
    setMessage: (state, { payload: message }) => {
        state.message = message;
    },
    setSoupImgId: (state, { payload: soupImgId }) => {
        state.soupImgId = soupImgId;
    },
    clearTray: (state) => {
        state.bowl = "bowl1";
        state.decorations = [];
        state.message = "";
        state.soupImgId = "";
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
const selectDecorationsState = createSelector(
    (state) => state.decorations,
    (decorations) => decorations
)
const selectMessage = createSelector(
    (state) => state.message,
    (message) => message
)
const selectSoupImgIdState = createSelector(
    (state) => state.soupImgId,
    (soupImgId) => soupImgId
)

export const traySelector = {
    bowl: (state) => selectBowlState(state[TRAY]),
    decorations: (state) => selectDecorationsState(state[TRAY]),
    message: (state) => selectMessage(state[TRAY]),
    soupImgId: (state) => selectSoupImgIdState(state[TRAY]),
}

export const TRAY = slice.name
export const trayReducer = slice.reducer
export const trayAction = slice.actions