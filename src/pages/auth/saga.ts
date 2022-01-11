import { call, put, select, takeLatest } from 'redux-saga/effects'
import { userAction, userSelector } from './slice'
import { AuthAPI } from '../../api/auth'
import { navigate } from 'gatsby'

export function* setUser() {
    const { setUserSuccess, setUserFail } = userAction

    try {
        const profile = yield select(userSelector.profile)

        const result = yield call(AuthAPI.setUser, profile)

        yield put(setUserSuccess(result));
    } catch (err) {
        yield put(setUserFail(err));
    }
}

export function* isSignUp() {
    const { isSignUpSuccess, isSignUpFail, setUserSuccess, setAuthUser } = userAction

    try {
        const profile = yield select(userSelector.profile)
        const result = yield call(AuthAPI.isSignUp, profile)

        var count = result.data.USER_aggregate.aggregate.count;

        yield put(
            isSignUpSuccess({
                count: count
            })
        );

        if (profile != null) {
            if (count <= 0) {
                yield put(setUserSuccess(profile))
            } else {
                yield put(setAuthUser(profile))
            }
        }
    } catch (err) {
        yield put(isSignUpFail(err));
    }
}

export function* getUser() {
    const { getUserSuccess, getUserFail } = userAction

    try {
        const profile = yield select(userSelector.profile)
        const result = yield call(AuthAPI.getUser, profile);

        if (result.data.USER.length > 0) {
            yield put(
                getUserSuccess({
                    searchUserInfo: result.data.USER[0],
                    isSearchUser : true
                })
            );
        } else {
            yield put(
                getUserSuccess({
                    searchUserInfo: {},
                    isSearchUser : false
                })
            );
                
            // navigate("404.js")
        }
    } catch (err) {
        yield put(getUserFail(err));
        console.log(err);
    }
}

export function* watchUser() {
    const { setUserLoad, isSignUpLoad, getUserLoad } = userAction

    yield takeLatest(setUserLoad, setUser)
    yield takeLatest(isSignUpLoad, isSignUp)
    yield takeLatest(getUserLoad, getUser)
}