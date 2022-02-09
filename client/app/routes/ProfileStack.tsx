import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import EditScreen from "../screens/EditScreen";
import AddVehicleScreen from "../screens/AddVehicleScreen";

import { ProfileStackParams } from "../types";
import AddAdressScreen from "../screens/AddAdressScreen";

const Profile = createNativeStackNavigator<ProfileStackParams>();

const HomeStack = () => {
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="Profile" component={ProfileScreen} />
      <Profile.Screen name="Edit" component={EditScreen} />
      <Profile.Screen name="AddVehicle" component={AddVehicleScreen} />
      <Profile.Screen name="AddAddress" component={AddAdressScreen} />
    </Profile.Navigator>
  );
};

export default HomeStack;
