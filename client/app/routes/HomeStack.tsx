import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ServiceScreen from "../screens/ServiceScreen";

import { HomeStackParams } from "../types";
import { View } from "react-native";

const Home = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
      <Home.Screen name="HomeStack" component={HomeScreen} />
      <Home.Screen name="Service" component={ServiceScreen} />
    </Home.Navigator>
  );
};

export default HomeStack;
