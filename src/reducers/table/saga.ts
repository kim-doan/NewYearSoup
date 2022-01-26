import { call, put, select, takeLatest } from 'redux-saga/effects'
import { soupAction, soupSelector } from './slice'
import { SoupAPI } from '../../api/soup'
import { traySelector } from '../tray/slice';
import { userSelector } from '../auth/slice';
import { navigate } from 'gatsby';
import * as _ from 'lodash'

export function* getSoup() {
    const { getSoupSuccess, getSoupFail } = soupAction;

    try {
        const ownerInfo = yield select(soupSelector.ownerInfo);
        const pageable = yield select(soupSelector.pageable);
        const soupList = yield select(soupSelector.soupList);

        if (soupList[pageable.page].length <= 0) {
            const result = yield call(SoupAPI.getSoup, ownerInfo, pageable);

            if (result.data.SOUP.length > 0) {
                var totalCount = result.data.SOUP_aggregate.aggregate.count;

                yield put(
                    getSoupSuccess({
                        soupList: result.data.SOUP,
                        totalCount: totalCount
                    })
                )
            }
        }
    } catch (err) {
        yield put(getSoupFail(err));
        console.log(err)
    }
}

export function* getSoupDetail() {
    const { getSoupDetailSuccess, getSoupDetailFail } = soupAction;

    try {
        const soupNo = yield select(soupSelector.soupNo);

        const result = yield call(SoupAPI.getSoupDetail, soupNo);

        console.log(result.data.SOUP_DETAIL)
        if (result.data.SOUP_DETAIL.length > 0) {
            yield put(
                getSoupDetailSuccess({
                    soupDetail: result.data.SOUP_DETAIL[0]
                })
            )
        }
    } catch (err) {
        console.log(err);
        yield put(getSoupDetailFail(err));
    }
}

export function* addSoup() {
    const { addSoupSuccess, addSoupFail } = soupAction;

    try {
        const ownerInfo = yield select(soupSelector.ownerInfo);
        const message = yield select(traySelector.message);
        const authUser = yield select(userSelector.authUser);
        const soupImgId = yield select(traySelector.soupImgId);

        const param = {
            owner: ownerInfo.userId,
            soupImgId: soupImgId,
            sender: authUser.uid,
            message: message,
        }
        
        const result = yield call(SoupAPI.addSoup, param);

        if (result) {
            yield put(addSoupSuccess());
            navigate(`/table/${param.owner}`);
        }
    } catch (err) {
        yield put(addSoupFail(err));
        console.log(err)
    }
}

export function* watchSoup() {
    const { getSoupLoad, getSoupDetailLoad, addSoupLoad } = soupAction

    yield takeLatest(getSoupLoad, getSoup)
    yield takeLatest(getSoupDetailLoad, getSoupDetail)
    yield takeLatest(addSoupLoad, addSoup)
}