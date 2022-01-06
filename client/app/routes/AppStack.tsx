import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MdIcons from "@expo/vector-icons/MaterialIcons";
import HomeStack from "./HomeStack";

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
function OrderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Orders !</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const AppStackScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "white" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size = 24 }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person";
            } else if (route.name === "Orders") {
              iconName = focused ? "drive-eta" : "drive-eta";
            }

            // You can return any component that you like here!
            return <MdIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2C9BF0",
          tabBarInactiveTintColor: "black",
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Orders"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
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
    paddingTop: 20,
    backgroundColor: "white",
  },
});
