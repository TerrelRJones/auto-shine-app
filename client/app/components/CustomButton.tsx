import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

const Button = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",

    borderRadius: 5,
    marginVertical: 5,
  },
  btnText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
