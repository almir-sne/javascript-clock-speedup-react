import {delay} from 'redux-saga'
import {put, take, all, call} from 'redux-saga/effects'

export function* updateClock() {
    while (true) {
        yield put({type: 'DECREMENT'});
        yield call(delay, 1000);
    }

}

function* watchIncrementAsync() {
    while(true) {
        yield take('UPDATE_TIMER', updateClock);
        yield updateClock();
    }
}

export function* rootSaga() {
    yield all([
        watchIncrementAsync()
    ])
}