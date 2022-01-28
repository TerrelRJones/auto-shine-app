import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  setValue: any;
  secureTextEntry: boolean;
};

const Input = ({ placeholder, value, setValue, secureTextEntry }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 40,
    justifyContent: "center",

    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgray",

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    fontSize: 20,
    fontWeight: "bold",
  },
});