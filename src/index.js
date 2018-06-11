import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clock from './Clock';
import registerServiceWorker from './registerServiceWorker';
import timer from './reducers'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './sagas'


const sagaMiddleware = createSagaMiddleware();
const store = createStore(timer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

function render() {
    ReactDOM.render(
        <Clock store={store}/>,
        document.getElementById('root'));
}

registerServiceWorker();

render();
store.subscribe(render);