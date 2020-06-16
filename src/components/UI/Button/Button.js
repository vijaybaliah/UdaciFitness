import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
const styles = StyleSheet.create({
  primary: {
    marginTop: 6,
    padding: 8,
    width: 70,
    backgroundColor: "#2fb432",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  secondary: {
    marginTop: 6,
    padding: 8,
    width: 122,
    backgroundColor: "#2fb432",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});
const Button = (props) => {
  const styleArray = [];
  if (props.primary) {
    styleArray.push(styles.primary);
  }
  if (props.secondary) {
    styleArray.push(styles.secondary);
  }
  return (
    <TouchableOpacity style={styleArray} {...props}>
      <Text style={styles.textStyle}>+</Text>
    </TouchableOpacity>
  );
};
export default Button;
