import {
  VERIFY_MOBILE_NUMBER,
  SEND_USER_OTP,
} from '../actions';
import fetch from '../utils/api';
import {
  verifyUserMobileNo,
  signUpUser,
} from '../utils/apiRoutes';

const login = store => next => action => {
  const { type, payload } = action;
  const result =  next(action);
  switch(type) {
    case VERIFY_MOBILE_NUMBER:
      fetch(verifyUserMobileNo(), {
        method: 'post',
        data: payload
      }).then(response => {
        store.dispatch({type: type + '_SUCCESS', payload: response});
      }, (error) => {
        store.dispatch({type: type + '_ERROR', payload: {error: error.message}});
      }).catch(error => {
        store.dispatch({type: type + '_ERROR', payload: {error: error.toString()}});
      })
      break;
    case SEND_USER_OTP:
        fetch(signUpUser(), {
          method: 'post',
          data: payload
        }).then(response => {
          const { user: { user } = {}, ...rest } = response || {};
          store.dispatch({type: type + '_SUCCESS', payload: { ...rest, user }});
        }, (error) => {
          store.dispatch({type: type + '_ERROR', payload: {error: error.message}});
        }).catch(error => {
          store.dispatch({type: type + '_ERROR', payload: {error: error.toString()}});
        });
      break;
  }
  return result;
}

export default login;
