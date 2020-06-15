import { action } from '../utils/helpers';

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';
export const VERIFY_MOBILE_NUMBER = 'VERIFY_MOBILE_NUMBER';
export const VERIFY_MOBILE_NUMBER_SUCCESS = 'VERIFY_MOBILE_NUMBER_SUCCESS';
export const VERIFY_MOBILE_NUMBER_ERROR = 'VERIFY_MOBILE_NUMBER_ERROR';
export const SEND_USER_OTP = 'SEND_USER_OTP';
export const SEND_USER_OTP_SUCCESS = 'SEND_USER_OTP_SUCCESS';
export const SEND_USER_OTP_ERROR = 'SEND_USER_OTP_ERROR';

export function receiveEntries(entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries
  }
}

export function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    entry
  }
}

export const verifyMobileNumber = payload => action(VERIFY_MOBILE_NUMBER, payload);
export const sendUserOtp = payload => action(SEND_USER_OTP, payload);

// sendbird >>>>
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';

export const INIT_MENU = 'init_menu';
export const DISCONNECT_SUCCESS = 'disconnect_success';

export const INIT_PROFILE = 'init_profile';
export const GET_PROFILE_SUCCESS = 'get_profile_success';
export const UPDATE_PROFILE_SUCCESS = 'update_profile_success';
export const UPDATE_PROFILE_FAIL = 'update_profile_fail';

export const OPEN_CHANNEL_LIST_SUCCESS = 'open_channel_list_success';
export const OPEN_CHANNEL_LIST_FAIL = 'open_channel_list_fail';
// sendbird <<<<