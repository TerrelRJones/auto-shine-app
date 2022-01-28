import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AuthStackParams } from "../types";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../contexts/Auth";
import Title from "../components/Title";

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const auth = useAuth();

  const register = async () => {
    const user = await fetch("http://localhost:4001/api/v1/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        password2,
      }),
    });
  };

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
        <Title title="Create Account" />
        <CustomInput
          placeholder="First"
          value={firstName}
          setValue={setFirstName}
          secureTextEntry={false}
        />
        <CustomInput
          placeholder="Last"
          value={lastName}
          setValue={setLastName}
          secureTextEntry={false}
        />
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
        <CustomInput
          placeholder="confirm password"
          value={password2}
          setValue={setPassword2}
          secureTextEntry
        />
        <CustomButton title="Register" onPress={register} />
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={{ fontWeight: "600" }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{ marginLeft: 5, color: "#2C9BF0", fontWeight: "600" }}
            >
              Login
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

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
