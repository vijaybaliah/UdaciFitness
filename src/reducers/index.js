import { combineReducers } from 'redux';

import entries from './entries';

export const reducers = combineReducers({
  ...entries,
});
