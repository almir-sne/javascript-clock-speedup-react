import {delay} from 'redux-saga'
import {put, all, call, takeLatest} from 'redux-saga/effects'

const day = 60 * 60 * 24;
const hour = 60 * 60;
const minute = 60;

export function* updateClock({hours, minutes, speed}) {
    let time = Number(hours) * 3600 + Number(minutes) * 60;
    let currentTime = Math.max(time, 0);
    while (currentTime > 0) {
        let days = Math.floor(currentTime / day);
        let hours = Math.floor((currentTime % day) / hour);
        let minutes = Math.floor((currentTime % hour) / minute);
        let seconds = Math.floor(currentTime % minute);
        yield put({type: 'UPDATE_TIMER', text: days + "d " + hours + "h " + minutes + "m " + seconds + "s "});
        yield call(delay, 1000);
        currentTime = Math.max(currentTime - speed, 0);
    }
}

export function* rootSaga() {
    yield all([
        takeLatest('SET_TIMER', updateClock)
    ])
}