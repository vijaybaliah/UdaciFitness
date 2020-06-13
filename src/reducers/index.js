import { combineReducers } from 'redux';

import entries from './entries';
import login from './login';

export const reducers = combineReducers({
  ...entries,
  ...login,
});
