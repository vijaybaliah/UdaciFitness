import {
  SEND_USER_OTP,
  SEND_USER_OTP_SUCCESS,
  SEND_USER_OTP_ERROR,
} from '../actions';
import fetch from '../utils/api';
import { verifyUserMobileNo } from '../utils/apiRoutes';

const login = store => next => action => {
  const { type, payload } = action;
  const result =  next(action);
  switch(type) {
    case SEND_USER_OTP:
      fetch(verifyUserMobileNo(), {
        method: 'post',
        data: payload
      }).then(response => {
        store.dispatch({type: SEND_USER_OTP_SUCCESS, payload: response});
      }, (error) => {
        store.dispatch({type: SEND_USER_OTP_ERROR, payload: {error: error.message}});
      }).catch(error => {
        store.dispatch({type: SEND_USER_OTP_ERROR, payload: {error: error.toString()}});
      })
      break;
  }
  return result;
}

export default login;
