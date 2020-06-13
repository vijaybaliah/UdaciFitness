import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import login from './login';

export default applyMiddleware(thunk, login);
