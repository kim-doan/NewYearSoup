import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Pageable } from '../../types/Pageable';
import { User } from '../../types/User';

export const initialState = {
    success: false,
    isLoading: false,
    msg: "",
    error: "",
    soupList: [],
    searchUserInfo: {},
    pageable: {
        page: 0,
        size: 4,
    }
}

const reducers = {
    getSoupLoad: (state, { payload: { userId, page } }) => {
        state.isLoading = true;
        state.success = false;
        state.pageable = {
            ...state.pageable,
            page : page
        }
        state.searchUserInfo = {
            ...state.searchUserInfo,
            userId : userId
        }
    },
    getSoupSuccess: (state, { payload: { soupList }}) => {
        state.isLoading = false;
        state.success = false;
        state.soupList = [...soupList, soupList];
    },
    getSoupFail: (state, { payload: { payload: error } }) => {
        state.isLoading = false;
        state.success = false;
        state.error = error
    }
}

const name = "SOUP"

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
const selectSearchUserInfoState = createSelector(
    (state) => state.searchUserInfo,
    (searchUserInfo) => searchUserInfo
)
const selectPageableState = createSelector(
    (state) => state.pageable,
    (pageable) => pageable
)
const selectSoupListState = createSelector(
    (state) => state.soupList,
    (soupList) => soupList
)

export const soupSelector = {
    success: (state) => selectSuccessSate(state[SOUP]),
    isLoading: (state) => selectLoadingState(state[SOUP]),
    error: (state) => selectErrorState(state[SOUP]),
    msg: (state) => selectMsgState(state[SOUP]),
    searchUserInfo: (state) => selectSearchUserInfoState(state[SOUP]),
    soupList: (state) => selectSoupListState(state[SOUP]),
    pageable: (state) => selectPageableState(state[SOUP]),
} 

export const SOUP = slice.name
export const soupReducer = slice.reducer
export const soupAction = slice.actions