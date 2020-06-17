import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import InputText from "../components/UI/InputText";
import Button from "../components/UI/Button";
import { WorldAlignment } from "expo/build/AR";
import { AntDesign } from '@expo/vector-icons';
import { WHITE } from '../components/UI/UikitUtils/colors';

const History = () => {

  const [discount, setDiscount] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Log your first order to get {"\n"}started with your store.
      </Text>

      <View>
        <Text style={styles.productPriceTitle}>
          Enter Product Price
        </Text>
      </View>
      {/*<TextInput style={styles.input} placeholder="৳" />*/}
      <View style={styles.productPriceRow}>
        <InputText
          primary
          rounded
          numeric
          overideStyle={styles.productPrice}
          placeholder="৳"
          flex={6}
        />
        <Button
          success
          overideStyle={styles.addOrderBtn}
        >
          <AntDesign
            name={'plus'}
            color={WHITE}
            size={26}
          />
        </Button>
      </View>
      <View style={styles.discount}>
        <InputText
          secondary
          numeric
          value={discount}
          placeholder="Discount"
          onChange={setDiscount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  productPriceTitle: {
    marginVertical: 24
  },
  textStyle: {
    fontWeight: "bold",
  },
  productPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginVertical: 8,
  },
  productPrice: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  addOrderBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  discount: {
    marginTop: 40,
    height: 40,
  },
});

export default History;
