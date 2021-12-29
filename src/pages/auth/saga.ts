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
    const { isSignUpSuccess, isSignUpFail } = userAction

    try {
        const profile = yield select(userSelector.profile)

        const result = yield call(Auth.isSignUp, profile)
        
        yield put(
            isSignUpSuccess({
                count: result.data.USER_aggregate.aggregate.count
            }
        ));
    } catch (err) {
        yield put(isSignUpFail(err));
    }
}

export function* watchUser() {
    const { setUserLoad, isSignUpLoad } = userAction

    yield takeLatest(setUserLoad, setUser)
    yield takeLatest(isSignUpLoad, isSignUp)
}