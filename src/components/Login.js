import React, { useState } from 'react';
import InputText from './UI/InputText';
import { verifyMobileNumber } from '../actions';
import { useSelector, useDispatch } from "react-redux";
import { View } from 'react-native';
import Button from './UI/Button';

const Login = (props) => {

  const [ phone, setPhone ] = useState('');
  const [ otp, setOtp ] = useState('');
  const { status } = useSelector(state => state.verifyUserMobileNo);
  const dispatch = useDispatch();

  const handlePhoneNumberChange = value => setPhone(value);

  const handleOTPUpdate = value => setOtp(value);

  const handleVerifyMobile = () => {
    const payload = {
      direct_login: true,
      user: {
        login: phone,
        resend: false,
        type: {
          register: true
        }
      }
    };
    console.log('handleVerifyMobile payload: ', payload);
    if (status) {

    } else {
      dispatch(verifyMobileNumber(payload));
    }

  }

  return (
    <View>
      <InputText
        onChangeText={handlePhoneNumberChange}
        value={phone}
      />
      {
        status &&
        <InputText
          onChangeText={handleOTPUpdate}
          value={otp}
        />
      }
      <Button
        title={'Verify Mobile Number'}
        onClick={handleVerifyMobile}
      />
    </View>
  )
}

export default Login;
