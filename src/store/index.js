import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { watchUser } from '../pages/auth/saga'
import { USER, userReducer } from '../pages/auth/slice'
import { watchSoup } from '../pages/table/saga'
import { SOUP, soupReducer } from '../pages/table/slice'

export const rootReducer = combineReducers({
    [USER]: userReducer,
    [SOUP]: soupReducer,
})

const sagaMiddleware = createSagaMiddleware()

export function* rootSaga() {
    yield all([
        watchUser(),
        watchSoup(),
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