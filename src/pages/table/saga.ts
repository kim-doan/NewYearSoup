import { call, put, select, takeLatest } from 'redux-saga/effects'
import { soupAction, soupSelector } from './slice'
import { SoupAPI } from '../../api/soup'

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

export function* watchSoup() {
    const { getSoupLoad } = soupAction

    yield takeLatest(getSoupLoad, getSoup)
}