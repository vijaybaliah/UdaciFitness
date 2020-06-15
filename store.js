import { createStore, compose } from 'redux';

import { reducers } from './src/reducers';
import middlewares from './src/middlewares';

const store = createStore(reducers, {}, compose(middlewares));

export default store;
