import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from "react-native";
import { BORDER_COLOR } from '../UikitUtils/colors';

const styles = StyleSheet.create({
  primary: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  secondary: {
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
  },
  common: {
    height: 40,
    padding: 12,
  },
  rounded: {
    borderRadius: 4,
  }
});

const InputText = (props) => {
  const {
    flex,
    primary,
    secondary,
    rounded,
    style,
    overideStyle,
    numeric,
    onChange,
    onChangeNative,
  } = props;
  const styleArray = [styles.common, { flex }];
  if (primary) {
    styleArray.push(styles.primary);
  } else if (secondary) {
    styleArray.push(styles.secondary);
  }

  if (rounded) {
    styleArray.push(styles.rounded);
  }

  if (overideStyle) {
    styleArray.push(overideStyle)
  }

  const keyboardType = numeric ? 'numeric' : 'default';
  return (
      <TextInput
        keyboardType={keyboardType}
        style={styleArray}
        onChange={onChangeNative}
        onChangeText={onChange}
        {...props}
      />
    );
};

InputText.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  flex: PropTypes.number,
  overideStyle: PropTypes.object,
  numeric: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeNative: PropTypes.func,
}

InputText.defaultProps = {
  flex: 1,
}

export default InputText;
