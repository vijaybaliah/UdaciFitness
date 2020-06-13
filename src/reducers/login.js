import {
  VERIFY_MOBILE_NUMBER,
  VERIFY_MOBILE_NUMBER_SUCCESS,
  VERIFY_MOBILE_NUMBER_ERROR,
  SEND_USER_OTP,
  SEND_USER_OTP_SUCCESS,
  SEND_USER_OTP_ERROR,
} from '../actions';

const verifyUserMobileNo = (state = {
  isLoading: false,
  message: '',
  status: false,
  type: {},
}, { type, payload }) => {
  switch(type) {
    case VERIFY_MOBILE_NUMBER:
      return {
        ...state,
        isLoading: true,
      }
    case VERIFY_MOBILE_NUMBER_SUCCESS:
    case VERIFY_MOBILE_NUMBER_ERROR:
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
}

const userInfo = (state = {
  isLoading: false,
  message: '',
  status: false,
  loginInfo: {},
  profile: {},
  user: {},
  verify: {},
}, { type, payload }) => {
  switch(type) {
    case SEND_USER_OTP:
      return {
        ...state,
        isLoading: true,
      }
    case SEND_USER_OTP_SUCCESS:
    case SEND_USER_OTP_ERROR:
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
}

export default {
  verifyUserMobileNo,
  userInfo,
};
