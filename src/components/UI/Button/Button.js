import React from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from "react-native";
import { GREEN, PRIMARY_COLOR } from '../UikitUtils/colors';

const styles = StyleSheet.create({
  primary: {
    backgroundColor: PRIMARY_COLOR,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  secondary: {
    backgroundColor: "#2fb432",
  },
  common: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 4,
  },
  success: {
    backgroundColor: GREEN,
  },
});

const Button = (props) => {
  const {
    flex,
    style,
    overideStyle,
    primary,
    secondary,
    success,
  } = props;
  const styleArray = [styles.common, { flex }];
  if (primary) {
    styleArray.push(styles.primary);
  } else if (secondary) {
    styleArray.push(styles.secondary);
  } else if (success) {
    styleArray.push(styles.success);
  }

  if (overideStyle) {
    styleArray.push(overideStyle);
  }

  return (
    <TouchableOpacity
      style={styleArray}
      {...props}
    >
      {props.children}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  flex: PropTypes.number,
  overideStyle: PropTypes.object,
  success: PropTypes.bool,
}

Button.defaultProps = {
  flex: 1,
}

export default Button;
