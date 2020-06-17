import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View } from "react-native";
import { BORDER_COLOR } from '../UikitUtils/colors';

const styles = StyleSheet.create({
  outline: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  normal: {
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
  },
  common: {
    padding: 12,
  },
  container: {
    height: 40,
  },
  rounded: {
    borderRadius: 4,
  }
});

const InputText = (props) => {
  const {
    flex,
    normal,
    outline,
    rounded,
    style,
    overideStyle,
    numeric,
    onChange,
    onChangeNative,
  } = props;
  const styleArray = [styles.common];
  const containerStyleArray = [styles.container];

  if (flex) {
    containerStyleArray.push({flex});
  }
  if (outline) {
    styleArray.push(styles.outline);
  } else if (normal) {
    styleArray.push(styles.normal);
  }

  if (rounded) {
    styleArray.push(styles.rounded);
  }

  if (overideStyle) {
    styleArray.push(overideStyle)
  }

  const keyboardType = numeric ? 'numeric' : 'default';
  return (
      <View style={containerStyleArray}>
        <TextInput
          keyboardType={keyboardType}
          style={styleArray}
          onChange={onChangeNative}
          onChangeText={onChange}
          {...props}
        />
      </View>
    );
};

InputText.propTypes = {
  normal: PropTypes.bool,
  outline: PropTypes.bool,
  flex: PropTypes.number,
  overideStyle: PropTypes.object,
  numeric: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeNative: PropTypes.func,
}

InputText.defaultProps = {
  normal: true,
}

export default InputText;
