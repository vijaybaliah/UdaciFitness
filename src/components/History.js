import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import InputText from "../components/UI/InputText";
import Button from "../components/UI/Button";

class History extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          Log your first order to get {"\n"}started with your store.
        </Text>

        <Text style={{ paddingTop: 25 }}>Enter Product Price</Text>

        {/*<TextInput style={styles.input} placeholder="৳" />*/}
        <View style={{ flexDirection: "row" }}>
          <InputText placeholder="৳" primary />
          <Button primary />
        </View>
        <InputText placeholder="Discount" secondary />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  textStyle: {
    fontWeight: "bold",
  },
});

export default History;
