import { createSelector, createSlice } from '@reduxjs/toolkit';
export const initialState = {
    success: false,
    isLoading: false,
    error: "",

    isSignUp: null, // 회원가입 여부
    profile: null, // 로그인한 사용자 정보

    isAuthUserLoad: false,
    authUser: null,

    searchUserInfo: {}, //검색 유저정보
    isSearchUser: undefined, // 검색유저 존재여부

    authUserParam: {},
    searchUserParam: {},
}

const reducers = {
    setAuthUser: (state, { payload: profile }) => {
        state.isAuthUserLoad = true;
        state.authUser = profile;
    },
    isSignUpLoad: (state, { payload: { uid, email, displayName } }) => {
        state.isLoading = true;
        state.isSignUp = false;
        state.success = false;

        state.authUserParam = {
            "userId": uid,
            "userEmail": email,
            "userName": displayName
        }
    },
    isSignUpSuccess: (state, { payload: { isSiginUp, profile } }) => {
        state.isLoading = false;
        state.success = true;
        state.isSignUp = isSiginUp
        state.profile = profile
    },
    isSignUpFail: (state, { payload: error }) => {
        state.isLoading = false;
        state.isSignUp = false;
        state.success = false;
        state.profile = null;
        state.error = error;
    },
    getUserLoad: (state, { payload: { uid } }) => {
        state.isLoading = true;
        state.success = false;
        state.isSearchUser = undefined;
        state.searchUserParam = {
            ...state.searchUserParam,
            "userId": uid
        }
    },
    getUserSuccess: (state, { payload: { searchUserInfo, isSearchUser } }) => {
        state.isLoading = false;
        state.success = true;
        state.isSearchUser = isSearchUser;
        state.searchUserInfo = searchUserInfo;
    },
    getUserFail: (state, { payload: error }) => {
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

const selectIsAuthUserLoadState = createSelector(
    (state) => state.isAuthUserLoad,
    (isAuthUserLoad) => isAuthUserLoad
)

const selectAuthUserParamState = createSelector(
    (state) => state.authUserParam,
    (authUserParam) => authUserParam
)
const selectSearchUserParamState = createSelector(
    (state) => state.searchUserParam,
    (searchUserParam) => searchUserParam
)
export const userSelector = {
    success: (state) => selectSuccessSate(state[USER]),
    isLoading: (state) => selectLoadingState(state[USER]),
    isSignUp: (state) => selectSignUpState(state[USER]),
    error: (state) => selectErrorState(state[USER]),
    profile: (state) => selectProfileState(state[USER]),
    authUser: (state) => selectAuthUserState(state[USER]),
    searchUserInfo: (state) => selectSearchUserInfoState(state[USER]),
    isSearchUser: (state) => selectIsSearchUserState(state[USER]),
    isAuthUserLoad: (state) => selectIsAuthUserLoadState(state[USER]),
    authUserParam: (state) => selectAuthUserParamState(state[USER]),
    searchUserParam: (state) => selectSearchUserParamState(state[USER]),
}

export const USER = slice.name
export const userReducer = slice.reducer
export const userAction = slice.actions