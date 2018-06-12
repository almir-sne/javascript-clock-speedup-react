import {delay} from 'redux-saga'
import {put, take, all, call, select, fork, cancel} from 'redux-saga/effects'

export function* updateClock() {
    const getTime = state => state.time;
    let time = yield select(getTime);
    while (time > 0) {
        yield put({type: 'DECREMENT'});
        yield call(delay, 1000);
        time = yield select(getTime);
    }
}

function* watchIncrementAsync() {
    let updateClockTask;

    while (true) {
        yield take('UPDATE_TIMER');
        if (updateClockTask) {
            yield cancel(updateClockTask);
        }
        updateClockTask = yield fork(updateClock)
    }
}

export function* rootSaga() {
    yield all([
        watchIncrementAsync()
    ])
}