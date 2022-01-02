import { call, put, select, takeLatest } from 'redux-saga/effects'
import { userAction, userSelector } from './slice'
import { Auth } from '../../api/auth'

export function* setUser() {
    const { setUserSuccess, setUserFail } = userAction

    try {
        const profile = yield select(userSelector.profile)

        const result = yield call(Auth.setUser, profile)

        yield put(setUserSuccess(result));
    } catch (err) {
        yield put(setUserFail(err));
    }
}

export function* isSignUp() {
    const { isSignUpSuccess, isSignUpFail, setUserSuccess, setAuthUser } = userAction

    try {
        const profile = yield select(userSelector.profile)
        const result = yield call(Auth.isSignUp, profile)

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

export function* getAllUserId() {
    const { getAllUserIdSuccess, getAllUserIdFail } = userAction

    try {
        const result = yield call(Auth.getAllUserId);

        yield put(
            getAllUserIdSuccess({
                userIdArr: result.data.USER
            })
        );
    } catch (err) {
        yield put(getAllUserIdFail(err));
    }
}

export function* watchUser() {
    const { setUserLoad, isSignUpLoad, getAllUserIdLoad } = userAction

    yield takeLatest(setUserLoad, setUser)
    yield takeLatest(isSignUpLoad, isSignUp)
    yield takeLatest(getAllUserIdLoad, getAllUserId)
}