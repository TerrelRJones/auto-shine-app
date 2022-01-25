import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";
import CustomInput from "../components/CustomInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParams } from "../types";

import { useAuth } from "../contexts/Auth";
import Title from "../components/Title";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const signIn = async () => {
    isLoading(true);
    await auth.signIn(email, password);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title title="Login" />
        <CustomInput
          placeholder="email"
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
        />
        <CustomInput
          placeholder="password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator color={"#000"} animating={true} size="small" />
        ) : (
          <CustomButton title="Login" onPress={signIn} />
        )}
        <CustomButtonSecondary title="Forgot Password" onPress={() => null} />
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={{ fontWeight: "600" }}>No account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
            <Text
              style={{ marginLeft: 5, color: "#2C9BF0", fontWeight: "600" }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => null}>
          <Text style={{ color: "#2C9BF0", fontWeight: "600" }}>Privacy</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
