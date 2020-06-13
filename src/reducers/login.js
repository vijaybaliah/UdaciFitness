import {
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
  verifyUserMobileNo
};
