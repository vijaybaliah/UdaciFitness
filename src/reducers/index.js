import { combineReducers } from 'redux';

import entries from './entries';
import login from './login';
import sendbirdLogin from './loginReducer';
import menu from './menuReducer';
import openChannel from './openChannelReducer';
import profile from './profileReducer';

export const reducers = combineReducers({
  ...entries,
  ...login,
  sendbirdLogin,
  menu,
  openChannel,
  profile,
});
