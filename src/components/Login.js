import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  AsyncStorage,
  Text,
} from 'react-native';
import { Formik, ErrorMessage } from 'formik';

import InputText from './UI/InputText';
import {
  verifyMobileNumber,
  sendUserOtp,
} from '../actions';
import Button from './UI/Button';
import { USER } from '../utils/constants';

const Login = (props) => {

  const {
    status,
    loggedInStatus,
    user
  } = useSelector(state => {
    const { verifyUserMobileNo, userInfo } = state;
    return {
      status: verifyUserMobileNo.status,
      loggedInStatus: userInfo.status,
      user: userInfo.user || null
    }
  });
  const dispatch = useDispatch();

  // login form validation
  const handleFormValidation = (values) => {
    const errors = {};

    if (!values.phone) {
      errors.phone = 'This field is required';
    }
    if (status && !values.otp) {
      errors.otp = 'This field is required';
    }

    return errors;
  }
  // on login submit
  const handleVerifyMobile = (value) => {
    const { phone, otp } = value;
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
    if (user !== null) {
      try {
        const userString = JSON.stringify(user);
        await AsyncStorage.setItem(USER, userString);
        props.navigation.navigate('App');
      } catch (error) {
        console.log('signInAsync user: ', user)
        console.log('signInAsync error: ', error)
      }
    }
  };

  if (loggedInStatus) {
    signInAsync();
  }

  return (
    <Formik
      initialValues={{
        phone: '',
        otp: ''
      }}
      onSubmit={handleVerifyMobile}
      validate={handleFormValidation}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text>Phone:</Text>
          <InputText
            onChange={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
          />
          <Text>
            <ErrorMessage name={'phone'} />
          </Text>
          {
            status &&
            <View>
              <Text>otp:</Text>
              <InputText
                onChange={handleChange('otp')}
                onBlur={handleBlur('otp')}
                value={values.otp}
              />
              <Text>
                <ErrorMessage name={'otp'} />
              </Text>
            </View>
          }
          <Button
            title={'Verify Mobile Number'}
            onClick={handleSubmit}
          />
        </View>
      )}
    </Formik>
  )
}

export default Login;
