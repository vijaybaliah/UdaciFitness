import React from 'react';
import { TextInput } from 'react-native';

const InputText = (props) => {
  return (
    <TextInput
      maxLength={40}
      {...props}
    />
  )
}

export default InputText;
