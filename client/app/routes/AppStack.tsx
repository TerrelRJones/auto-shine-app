import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MdIcons from "@expo/vector-icons/MaterialIcons";
import HomeStack from "./HomeStack";

import ProfileStack from "./ProfileStack";
import AppointmentScreen from "../screens/AppointmentScreen";
import { color } from "../components/colors";

const Tab = createBottomTabNavigator();

const AppStackScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "white" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person";
            } else if (route.name === "Appointments") {
              iconName = focused ? "drive-eta" : "drive-eta";
            }

            // You can return any component that you like here!
            return <MdIcons name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: `${color.primary}`,
          tabBarInactiveTintColor: "#98CAED",
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Appointments"
          component={AppointmentScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default AppStackScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingTop: 20,
    backgroundColor: "white",
  },
});
