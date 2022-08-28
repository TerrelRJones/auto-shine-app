import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";
import CustomInput from "../components/CustomInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParams } from "../types";

import Title from "../components/Title";
import { useSignIn } from "../hooks/useSignIn";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ loading }, { signIn }] = useSignIn();

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
            <Title title="Login" />
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
            {loading ? (
              <CustomButton
                title={
                  <ActivityIndicator
                    color={"#fff"}
                    animating={true}
                    size="small"
                  />
                }
              />
            ) : (
              <CustomButton
                title="Login"
                onPress={() => signIn({ email, password })}
              />
            )}
            <CustomButtonSecondary
              title="Forgot Password"
              onPress={() => null}
            />
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text style={{ fontWeight: "600" }}>No account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text
                  style={{ marginLeft: 5, color: "#2C9BF0", fontWeight: "600" }}
                >
                  Register
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
