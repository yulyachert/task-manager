import {createStore, applyMiddleware} from 'redux';
import allReducers from '../reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;