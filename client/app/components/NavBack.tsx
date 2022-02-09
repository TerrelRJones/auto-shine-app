import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import { Fontisto } from "@expo/vector-icons/";

import Title from "./Title";

type Props = {
  onPress: () => void;
  title: string;
};

const NavBack = ({ onPress, title }: Props) => {
  return (
    <View style={styles.styleContainer}>
      <Pressable onPress={onPress} style={styles.btn}>
        <Fontisto name="angle-dobule-left" size={24} />
      </Pressable>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Title title={title} />
      </View>
    </View>
  );
};

export default NavBack;

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
