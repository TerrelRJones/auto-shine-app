import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AppStackScreen = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "dodgerblue",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default AppStackScreen;

const styles = StyleSheet.create({});
