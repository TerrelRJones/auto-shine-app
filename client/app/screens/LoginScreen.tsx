import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";
import CustomInput from "../components/CustomInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParams } from "../routes/AuthStack";

import { useAuth } from "../contexts/Auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  // const submitCredintials = async () => {
  //   const user = await fetch("http://localhost:4001/api/v1/register", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     }),
  //   });

  //   console.log(user);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Login
        </Text>
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
        <CustomButton
          title="Login"
          onPress={() => {
            auth.signIn;
          }}
        />
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
