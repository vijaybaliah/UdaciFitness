import React, { useState } from 'react';
import InputText from './UI/InputText';

const Login = (props) => {

  const [ phone, setPhone ] = useState('');

  handlePhoneNumberChange = (value) => {
    setPhone(value);
    
  }

  return (
    <InputText
      onChange={handlePhoneNumberChange}
      value={phone}
    />
  )
}

export default Login;
