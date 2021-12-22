import { createSelector, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User'
export const initialState = {
    isLoading: false,
    msg: "",
    error: "",
    profile: null,
}

const reducers = {
    setProfile: (state, { payload: { uid, email } } ) => {
        state.isLoading = true
        console.log(uid)
        console.log(email)

        state.profile = {
            "userId": uid,
            "userName": email
        }
    },
    setProfileSuccess: (state, { payload: { data } }) => {
        state.isLoading = false
        state.profile = data;
    },
    setProfileFail: (state, { payload: error }) => {
        state.error = error
    },
}

const name = "USER"

const slice = createSlice({
    name,
    initialState,
    reducers
})

const selectLoadingState = createSelector(
    (state) => state.isLoading,
    (isLoading) => isLoading
)

const selectErrorState = createSelector(
  (state) => state.error,
  (error) => error
)

const selectMsgState = createSelector(
  (state) => state.msg,
  (msg) => msg
)

const selectProfileState = createSelector(
    (state) => state.profile,
    (profile) => profile
)

const selectAllState = createSelector(
    selectLoadingState,
    selectErrorState,
    selectMsgState,
    selectProfileState,
    (isLoading, error, msg, profile) => {
        return {
            isLoading,
            error,
            msg,
            profile
        }
    }
)

export const userSelector = {
    isLoading: (state) => selectLoadingState(state[USER]),
    error: (state) => selectErrorState(state[USER]),
    msg: (state) => selectMsgState(state[USER]),
    profile: (state) => selectProfileState(state[USER])
}

export const USER = slice.name
export const userReducer = slice.reducer
export const userAction = slice.actions