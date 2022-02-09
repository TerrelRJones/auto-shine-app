import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { useAuth } from "../contexts/Auth";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SmallTextTitle from "../components/SmallTextTitle";
import NavBack from "../components/NavBack";

import { color } from "../components/colors";

import { useNavigation } from "@react-navigation/native";

const AddAdressScreen = () => {
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const navigation = useNavigation();
  const auth = useAuth();

  const addAddress = async () => {
    await fetch(`http://localhost:4001/api/v1/createAddress/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `${auth.authData?.token}`,
      },
      body: JSON.stringify({
        state,
        city,
        zip,
        street,
        addressId: `${auth.authData?.userId}`,
      }),
    });
  };

  return (
    <View style={styles.container}>
      <NavBack title="Add Vehicle" onPress={() => navigation.goBack()} />
      <SmallTextTitle title="Street" />
      <CustomInput
        placeholder=""
        value={street}
        setValue={setStreet}
        secureTextEntry={false}
      />
      <SmallTextTitle title="Zip Code" />
      <CustomInput
        placeholder=""
        value={zip}
        setValue={setZip}
        secureTextEntry={false}
      />
      <SmallTextTitle title="State" />
      <CustomInput
        placeholder=""
        value={state}
        setValue={setState}
        secureTextEntry={false}
      />
      <SmallTextTitle title="City" />
      <CustomInput
        placeholder=""
        value={city}
        setValue={setCity}
        secureTextEntry={false}
      />
      <CustomButton title="Add Address" onPress={addAddress} />
    </View>
  );
};

export default AddAdressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${color.white}`,
  },
});
