import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStackParams } from "../types";

const Auth = createNativeStackNavigator<AuthStackParams>();

const AuthStackScreen = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Registration" component={RegistrationScreen} />
    </Auth.Navigator>
  );
};

export default AuthStackScreen;
