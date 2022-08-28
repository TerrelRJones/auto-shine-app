import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AuthStackParams } from "../types";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../contexts/Auth";
import Title from "../components/Title";
import { useSignIn } from "../hooks/useSignIn";

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const auth = useAuth();

  const [{ loading }, { submitCredintials }] = useSignIn();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/autoshine_logo_color.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={{ flex: 1 }}>
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
              keyBoardType="email-address"
            />
            <CustomInput
              placeholder="password"
              value={password}
              setValue={setPassword}
              secureTextEntry
            />
            {auth.authData?.error ? (
              <Text>{auth.authData.error[0]}</Text>
            ) : (
              <></>
            )}
            <CustomInput
              placeholder="confirm password"
              value={password2}
              setValue={setPassword2}
              secureTextEntry
            />

            {loading && (
              <ActivityIndicator color={"#000"} animating={true} size="small" />
            )}

            {!loading && (
              <CustomButton
                title="Register"
                onPress={() =>
                  submitCredintials({
                    firstName,
                    lastName,
                    email,
                    password,
                    password2,
                  })
                }
              />
            )}

            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text style={{ fontWeight: "600" }}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{ marginLeft: 5, color: "#2C9BF0", fontWeight: "600" }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => null}>
              <Text style={{ color: "#2C9BF0", fontWeight: "600" }}>
                Privacy
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
