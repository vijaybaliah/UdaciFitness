import React from 'react';
import { Button as ButtonComponent } from 'react-native';

const Button = (props) => {
  return (
    <ButtonComponent
      onPress={props.onClick}
      {...props}
    />
  )
}

export default Button;
