import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

type AuthStackParams = {
  Registration: undefined;
  Login: undefined;
};

const Auth = createNativeStackNavigator<AuthStackParams>();

const AuthStackScreen = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Registration" component={RegistrationScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
    </Auth.Navigator>
  );
};

export default AuthStackScreen;
