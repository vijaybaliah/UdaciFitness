import React from "react";
import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    borderWidth: 1,
    marginTop: 6,
    padding: 8,
    borderColor: "#979797",
    alignItems: "stretch",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  secondary: {
    borderBottomWidth: 1,
    marginTop: 30,
    borderColor: "#979797",
    padding: 8,
    alignItems: "stretch",
  },
});
const InputText = (props) => {
  const styleArray = [];
  if (props.primary) {
    styleArray.push(styles.primary);
  }
  if (props.secondary) {
    styleArray.push(styles.secondary);
  }
  return <TextInput style={styleArray} {...props} />;
};
export default InputText;
