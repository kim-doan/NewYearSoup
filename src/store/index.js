import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { watchUser } from '../reducers/auth/saga'
import { USER, userReducer } from '../reducers/auth/slice'
import { watchSoup } from '../reducers/table/saga'
import { SOUP, soupReducer } from '../reducers/table/slice'
import { TRAY, trayReducer } from '../reducers/tray/slice'

export const rootReducer = combineReducers({
    [USER]: userReducer,
    [SOUP]: soupReducer,
    [TRAY]: trayReducer,
})

const sagaMiddleware = createSagaMiddleware()

export function* rootSaga() {
    yield all([
        watchUser(),
        watchSoup()
    ])
}

const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: [sagaMiddleware]
    })
    sagaMiddleware.run(rootSaga)
    return store
}

export default createStore