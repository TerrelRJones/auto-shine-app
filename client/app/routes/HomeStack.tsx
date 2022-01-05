import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ServiceScreen from "../screens/ServiceScreen";

export type HomeStackParams = {
  HomeStack: undefined;
  Service: undefined;
};

const Home = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <>
      <Home.Navigator>
        <Home.Screen
          name="HomeStack"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Home.Screen name="Service" component={ServiceScreen} />
      </Home.Navigator>
    </>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
