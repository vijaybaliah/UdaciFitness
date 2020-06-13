import { createStore } from 'redux';

import reducers from './src/reducers';
import middlewares from './src/middlewares';

const store = createStore(reducers, middlewares);

export default store;
