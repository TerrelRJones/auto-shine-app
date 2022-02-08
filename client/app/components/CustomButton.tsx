import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { color } from "./colors";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: any;
};

const Button = ({ title, onPress, disabled }: Props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
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
    backgroundColor: `${color.primary}`,

    borderRadius: 5,
    marginVertical: 5,
  },
  btnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    textTransform: "uppercase",
  },
});
