import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import { useAuth } from "../contexts/Auth";

import { useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons/";

import Title from "../components/Title";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import NavBack from "../components/NavBack";

const EditScreen = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const auth = useAuth();

  const navigation = useNavigation();

  const getUserInfo = async () => {
    const user = await fetch(
      `http://localhost:4001/api/v1/user/${auth.authData?.userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: `${auth.authData?.token}`,
        },
      }
    );

    const res = await user.json();
    setFirstName(res.firstName);
    setLastName(res.lastName);
    setEmail(res.email);
  };

  const updateUserInfo = async () => {
    await fetch(`http://localhost:4001/api/v1/user/${auth.authData?.userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `${auth.authData?.token}`,
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <NavBack title="Edit Profile" onPress={() => navigation.goBack()} />
      <CustomInput
        placeholder="First Name"
        value={firstName}
        setValue={setFirstName}
        secureTextEntry={false}
      />
      <CustomInput
        placeholder="Last Name"
        value={lastName}
        setValue={setLastName}
        secureTextEntry={false}
      />
      <CustomInput
        placeholder="Email"
        value={email}
        setValue={setEmail}
        secureTextEntry={false}
      />
      <CustomButton title="Update" onPress={updateUserInfo} />
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  styleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  btn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 20,
  },
});
