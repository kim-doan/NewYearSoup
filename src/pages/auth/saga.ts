import { call, put, select, takeLatest } from 'redux-saga/effects'
import { userAction, userSelector } from './slice'
import { Auth } from '../../api/auth'

export function* setUser() {
    const { setProfileSuccess, setProfileFail } = userAction
    
    try {
        const profile = yield select(userSelector.profile)

        const result = yield call(Auth.setUser, profile)

        console.log(result)
    } catch (err) {
        yield put(setProfileFail(err));
    }
}

export function* watchUser() {
    const { setProfile } = userAction

    yield takeLatest(setProfile, setUser)
}