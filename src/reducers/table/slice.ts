import { createSelector, createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash'

export const initialState = {
    success: false,
    isLoading: false,
    msg: "",
    error: "",
    soupList: [],
    ownerInfo: {},
    totalCount: 0,
    pageable: {
        page: 0,
        size: 4,
    },
    soupDetail: {},
    soupNo: null,

    addSoupLoading: false,
}

const reducers = {
    getSoupLoad: (state, { payload: { userId, page } }) => {
        state.isLoading = true;
        state.success = false;
        state.pageable = {
            ...state.pageable,
            page: page
        }
        state.ownerInfo = {
            ...state.ownerInfo,
            userId: userId
        }

        if (state.soupList[page] === undefined) {
            state.soupList[page] = [];
        }
    },
    getSoupSuccess: (state, { payload: { soupList, totalCount } }) => {
        state.isLoading = false;
        state.success = true;
        state.totalCount = totalCount;
        state.soupList[state.pageable.page] = soupList;
    },
    getSoupFail: (state, { payload: { error } }) => {
        state.isLoading = false;
        state.success = false;
        state.error = error
    },
    getSoupDetailLoad: (state, { payload: { soupNo } }) => {
        state.isLoading = true;
        state.success = false;
        state.soupNo = soupNo;
    },
    getSoupDetailSuccess: (state, { payload: { soupDetail } }) => {
        state.isLoading = false;
        state.success = true;
        state.soupDetail = soupDetail;
    },
    getSoupDetailFail: (state, { payload: { error } }) => {
        state.isLoading = false;
        state.success = false;
        state.error = error;
    },
    addSoupLoad: (state) => {
        state.addSoupLoading = true;
        state.success = false;
    },
    addSoupSuccess: (state) => {
        state.addSoupLoading = false;
        state.success = true;
    },
    addSoupFail: (state, { payload: { error } }) => {
        state.addSoupLoading = false;
        state.success = false;
        state.error = error;
    },
    clearSoupList: (state) => {
        state.soupList = [];
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
const selectOwnerInfoState = createSelector(
    (state) => state.ownerInfo,
    (ownerInfo) => ownerInfo
)
const selectPageableState = createSelector(
    (state) => state.pageable,
    (pageable) => pageable
)
const selectSoupListState = createSelector(
    (state) => state.soupList,
    (soupList) => soupList
)
const selectTotalCountState = createSelector(
    (state) => state.totalCount,
    (totalCount) => totalCount
)
const selectSoupDetailState = createSelector(
    (state) => state.soupDetail,
    (soupDetail) => soupDetail
)
const selectSoupNoState = createSelector(
    (state) => state.soupNo,
    (soupNo) => soupNo
)
const selectAddSoupLoading = createSelector(
    (state) => state.addSoupLoading,
    (addSoupLoading) => addSoupLoading
)

export const soupSelector = {
    success: (state) => selectSuccessSate(state[SOUP]),
    isLoading: (state) => selectLoadingState(state[SOUP]),
    error: (state) => selectErrorState(state[SOUP]),
    msg: (state) => selectMsgState(state[SOUP]),
    ownerInfo: (state) => selectOwnerInfoState(state[SOUP]),
    soupList: (state) => selectSoupListState(state[SOUP]),
    pageable: (state) => selectPageableState(state[SOUP]),
    totalCount: (state) => selectTotalCountState(state[SOUP]),
    soupDetail: (state) => selectSoupDetailState(state[SOUP]),
    soupNo: (state) => selectSoupNoState(state[SOUP]),
    addSoupLoading: (state) => selectAddSoupLoading(state[SOUP]),
}

export const SOUP = slice.name
export const soupReducer = slice.reducer
export const soupAction = slice.actions