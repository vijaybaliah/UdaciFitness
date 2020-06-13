import { action } from '../utils/helpers';

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';
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

export const verifyMobileNumber = payload => action(SEND_USER_OTP, payload);
