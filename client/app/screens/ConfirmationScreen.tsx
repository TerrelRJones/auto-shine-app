import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import CustomButton from "../components/CustomButton";

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>APPOINTMENT CONFIRMED</Text>
      <CustomButton
        title="Go Home"
        onPress={() => navigation.navigate("HomeStack")}
      />
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
