import { call, put, select, takeLatest } from 'redux-saga/effects'
import { userAction, userSelector } from './slice'
import { AuthAPI } from '../../api/auth'
import { navigate } from 'gatsby'

export function* isSignUp() {
    const { isSignUpSuccess, isSignUpFail } = userAction

    try {
        const authUserParam = yield select(userSelector.authUserParam)
        const result = yield call(AuthAPI.isSignUp, authUserParam)

        var count = result.data.USER_aggregate.aggregate.count;

        const isSignUp = count > 0;

        if (isSignUp === true) {
            yield put(isSignUpSuccess({
                isSiginUp: isSignUp,
                profile: authUserParam
            }));
        } else {
            yield call(AuthAPI.addUser, authUserParam);

            yield put(isSignUpSuccess({
                isSiginUp: true,
                profile: authUserParam
            }));
        }
    } catch (err) {
        yield put(isSignUpFail(err));
    }
}

export function* getUser() {
    const { getUserSuccess, getUserFail } = userAction

    try {
        const searchUserParam = yield select(userSelector.searchUserParam)
        const result = yield call(AuthAPI.getUser, searchUserParam);

        if (result.data.USER.length > 0) {
            yield put(
                getUserSuccess({
                    searchUserInfo: result.data.USER[0],
                    isSearchUser: true
                })
            );
        } else {
            yield put(
                getUserSuccess({
                    searchUserInfo: {},
                    isSearchUser: false
                })
            );
        }
    } catch (err) {
        yield put(getUserFail(err));
    }
}

export function* watchUser() {
    const { isSignUpLoad, getUserLoad } = userAction

    yield takeLatest(isSignUpLoad, isSignUp)
    yield takeLatest(getUserLoad, getUser)
}