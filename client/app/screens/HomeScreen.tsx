import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Hello, Terrel
      </Text>

      <View>
        <Text>Location</Text>
        <Text>Tacoma, Wa</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.serviceContainer}></View>
        <View style={styles.serviceContainer}></View>
        <View style={styles.serviceContainer}></View>
        <View style={styles.serviceContainer}></View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    height: 400,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  serviceContainer: {
    backgroundColor: "red",
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 40,
  },
});
