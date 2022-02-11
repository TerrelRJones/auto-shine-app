import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  setValue: any;
  secureTextEntry: boolean;
  keyBoardType?: any;
};

const Input = ({
  placeholder,
  value,
  setValue,
  secureTextEntry,
  keyBoardType,
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        keyboardType={keyBoardType}
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
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "lightgray",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    fontSize: 20,
    fontWeight: "400",
  },
});
