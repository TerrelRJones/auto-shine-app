import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import Heading from "../components/Heading";
import Blurb from "../components/Blurb";

import { color } from "../components/colors";

import { useNavigation } from "@react-navigation/native";
const OppsScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `${color.white}`,
      }}
    >
      <Heading title="OOPS!" />
      <Blurb blurb="How are we supposed to wash a car with no car!?" />
      <CustomButton
        title="continue"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default OppsScreen;

const styles = StyleSheet.create({});
