import { createSelector, createSlice } from '@reduxjs/toolkit';
export const initialState = {
    success: false,
    isLoading: false,
    isSignUp: null,
    msg: "",
    error: "",
    profile: null,
    authUser: null,
    searchUserInfo: {},
    isSearchUser: false,
}

const reducers = {
    setAuthUser: (state, { payload: { user } }) => {
        state.authUser = user;
    },
    setUserLoad: (state, { payload: { uid, email, displayName } }) => {
        state.isLoading = true;
        state.success = false;

        state.profile = {
            "userId": uid,
            "userEmail": email,
            "userName": displayName,
        }
    },
    setUserSuccess: (state, payload) => {
        state.isLoading = false;
        state.success = true;
    },
    setUserFail: (state, { payload: error }) => {
        state.isLoading = false;
        state.success = false;
        state.error = error
    },
    isSignUpLoad: (state, { payload: { uid, email, displayName } }) => {
        state.isLoading = true;
        state.isSignUp = false;
        state.success = false;

        state.profile = {
            "userId": uid,
            "userEmail": email,
            "userName": displayName
        }
    },
    isSignUpSuccess: (state, { payload: { count } }) => {
        state.isLoading = false;
        state.success = true;

        if (count > 0) {
            state.isSignUp = true;
        } else {
            state.isSignUp = false;
        }
    },
    isSignUpFail: (state, { payload: { payload: error } }) => {
        state.isLoading = false;
        state.success = false;
        state.error = error;
    },
    getUserLoad: (state, { payload: { uid } }) => {
        state.isLoading = true;
        state.success = false;
        state.isSearchUser = false;
        state.profile = {
            "userId": uid
        }
    },
    getUserSuccess: (state, { payload: { searchUserInfo, isSearchUser } }) => {
        state.isLoading = false;
        state.success = true;
        state.isSearchUser = isSearchUser;
        state.searchUserInfo = searchUserInfo;
    },
    getUserFail: (state, { payload: { payload: error } }) => {
        state.isLoading = false;
        state.success = false;
        state.isSearchUser = false;
        state.error = error;
    }
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

const selectSignUpState = createSelector(
    (state) => state.isSignUp,
    (isSignUp) => isSignUp
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

const selectAuthUserState = createSelector(
    (state) => state.authUser,
    (authUser) => authUser
)

const selectSearchUserInfoState = createSelector(
    (state) => state.searchUserInfo,
    (searchUserInfo) => searchUserInfo
)

const selectIsSearchUserState = createSelector(
    (state) => state.isSearchUser,
    (isSearchUser) => isSearchUser
)

export const userSelector = {
    success: (state) => selectSuccessSate(state[USER]),
    isLoading: (state) => selectLoadingState(state[USER]),
    isSignUp: (state) => selectSignUpState(state[USER]),
    error: (state) => selectErrorState(state[USER]),
    msg: (state) => selectMsgState(state[USER]),
    profile: (state) => selectProfileState(state[USER]),
    authUser: (state) => selectAuthUserState(state[USER]),
    searchUserInfo: (state) => selectSearchUserInfoState(state[USER]),
    isSearchUser: (state) => selectIsSearchUserState(state[USER]),
}

export const USER = slice.name
export const userReducer = slice.reducer
export const userAction = slice.actions