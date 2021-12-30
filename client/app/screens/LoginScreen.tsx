import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";
import CustomInput from "../components/CustomInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParams } from "../routes/AuthStack";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  const submitCredintials = async () => {
    const user = await fetch("http://localhost:4001/api/v1/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            alignSelf: "center",
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
            null;
          }}
        />
        <CustomButtonSecondary title="Forgot Password" onPress={() => null} />
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text>Register</Text>
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
  },
});
