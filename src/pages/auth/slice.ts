import { createSelector, createSlice } from '@reduxjs/toolkit';
export const initialState = {
    success: false,
    isLoading: false,
    msg: "",
    error: "",
    profile: null,
}

const reducers = {
    setProfile: (state, { payload: { uid, email, name } } ) => {
        state.isLoading = true;
        state.success = false;

        state.profile = {
            "userId": uid,
            "userEmail": email,
            "userName": name,
        }
    },
    setProfileSuccess: (state, payload) => {
        state.success = true;
        state.isLoading = false;
    },
    setProfileFail: (state, { payload: error }) => {
        state.isLoading = false;
        state.success = false;
        state.error = error
    },
}

const name = "USER"

const slice = createSlice({
    name,
    initialState,
    reducers
})

const selectSuccessSate = createSelector(
    (state) => state.success,
    (success) => success
)

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
    selectSuccessSate,
    selectLoadingState,
    selectErrorState,
    selectMsgState,
    selectProfileState,
    (success, isLoading, error, msg, profile) => {
        return {
            success,
            isLoading,
            error,
            msg,
            profile
        }
    }
)

export const userSelector = {
    success: (state) => selectSuccessSate(state[USER]),
    isLoading: (state) => selectLoadingState(state[USER]),
    error: (state) => selectErrorState(state[USER]),
    msg: (state) => selectMsgState(state[USER]),
    profile: (state) => selectProfileState(state[USER])
}

export const USER = slice.name
export const userReducer = slice.reducer
export const userAction = slice.actions