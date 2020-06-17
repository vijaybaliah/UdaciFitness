import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  AsyncStorage,
  Text,
} from 'react-native';

import InputText from './UI/InputText';
import {
  verifyMobileNumber,
  sendUserOtp,
} from '../actions';
import Button from './UI/Button';

const Login = (props) => {

  const [ phone, setPhone ] = useState('');
  const [ otp, setOtp ] = useState('');
  const { status, loggedInStatus } = useSelector(state => {
    const { verifyUserMobileNo, userInfo } = state;
    return {
      status: verifyUserMobileNo.status,
      loggedInStatus: userInfo.status,
    }
  });
  const dispatch = useDispatch();

  const handlePhoneNumberChange = value => setPhone(value);

  const handleOTPUpdate = value => setOtp(value);

  const handleVerifyMobile = () => {
    if (status) {
      dispatch(sendUserOtp({
        direct_login: true,
        user: {
          phone,
          otp
        }
      }));
    } else {
      dispatch(verifyMobileNumber({
        direct_login: true,
        user: {
          login: phone,
          resend: false,
          type: {
            register: true
          }
        }
      }));
    }

  }

  const signInAsync = async () => {
    console.log('signInAsync called');
    await AsyncStorage.setItem('userToken', 'abc');
    props.navigation.navigate('App');
  };

  if (loggedInStatus) {
    signInAsync();
  }

  return (
    <View>
      <Text>Phone:</Text>
      <InputText
        onChange={handlePhoneNumberChange}
        value={phone}
      />
      {
        status &&
        <View>
          <Text>otp:</Text>
          <InputText
            onChange={handleOTPUpdate}
            value={otp}
          />
        </View>
      }
      <Button
        title={'Verify Mobile Number'}
        onClick={handleVerifyMobile}
      />
    </View>
  )
}

export default Login;
