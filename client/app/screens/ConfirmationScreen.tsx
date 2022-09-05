import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import CustomButton from "../components/CustomButton";
import NavBack from "../components/NavBack";
import Title from "../components/Title";

const ConfirmationScreen = () => {
  const { navigate } = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Title title="Confirmation" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text>APPOINTMENT CONFIRMED</Text>
        <CustomButton title="Go Home" onPress={() => navigate("HomeStack")} />
      </View>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
