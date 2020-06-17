import React from "react";
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  GREEN,
  PRIMARY_COLOR,
  PRIMARY_BTN_TEXT_COLOR,
} from '../UikitUtils/colors';

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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    minHeight: 40,
  },
  success: {
    backgroundColor: GREEN,
  },
  primaryText: {
    color: PRIMARY_BTN_TEXT_COLOR
  }
});

const Button = (props) => {
  const {
    flex,
    style,
    overideStyle,
    primary,
    secondary,
    success,
    children,
    title,
    onClick,
  } = props;
  const styleArray = [styles.common, {flex}];
  const styleTextArray = [];

  if (secondary) {
    styleArray.push(styles.secondary);
  } else if (success) {
    styleArray.push(styles.success);
  } else if (primary) {
    styleArray.push(styles.primary);
    styleTextArray.push(styles.primaryText);
  }

  if (overideStyle) {
    styleArray.push(overideStyle);
  }

  return (
    <TouchableOpacity
      onPress={onClick}
      style={styleArray}
      {...props}
    >
      {
        (title || typeof children === 'string') ?
        <View>
          <Text style={styleTextArray}>{title || children}</Text>
        </View> :
        children
      }
    </TouchableOpacity>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  flex: PropTypes.number,
  overideStyle: PropTypes.object,
  success: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  primary: true,
}

export default Button;
