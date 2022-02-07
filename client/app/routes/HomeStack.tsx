import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ServiceScreen from "../screens/ServiceScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";

import { HomeStackParams } from "../types";

const Home = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
      <Home.Screen name="HomeStack" component={HomeScreen} />
      <Home.Screen name="Service" component={ServiceScreen} />
      <Home.Screen name="Payment" component={PaymentScreen} />
      <Home.Screen name="Confirmation" component={ConfirmationScreen} />
    </Home.Navigator>
  );
};

export default HomeStack;
